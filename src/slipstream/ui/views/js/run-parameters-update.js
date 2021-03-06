/*
 * +=================================================================+
 * SlipStream Server (WAR)
 * =====
 * Copyright (C) 2013 SixSq Sarl (sixsq.com)
 * =====
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * -=================================================================-
 */

//
// Updated runtime parameters on a cyclic basis
//

String.prototype.trim = function() {
   return this.replace(/^\s+|\s+$/g,"");
}

$(document).ready(function() {

    updateDashboard();

	$('input[value="Terminate"]').click(function(event){
		event.preventDefault();
		SS.hideError();
		background.fadeOutTopWindow();
		$('#terminaterundialog').dialog('open');
		return false;
	});

	$('#terminaterundialog').dialog({
		autoOpen: false,
		title: 'Terminate Virtual Machines',
		buttons: {
			"Terminate": function() {
				$(this).dialog("close");
				background.fadeInTopWindow();
				showSubmitMessage();
				$.delete_(window.location.pathname, success=function() {
					window.location.href=window.location.href;
				});
			},
			"Cancel": function() {
				$(this).dialog("close");
				background.fadeInTopWindow();
			},
		}
	});

})

var dashboardUpdater = {

	initialState: 'Inactive',
	nodesInfo: {},

	getRuntimeValue: function(nodeName, parameterName) {
		return $("#" + nodeName.replace(".", "\\.") + "\\:" + parameterName).text();
	},

	getGlobalRuntimeValue: function(parameterName) {
		return $("#ss\\:" + parameterName).text();
	},

	getRuntimeValueFullName: function(parameterName) {
		return $("#" + parameterName).text();
	},

	isAbort: function(nodeName) {
	    if(nodeName){
    		return !(this.getRuntimeValue(nodeName, 'abort') === "");
	    } else {
    		return !(this.getGlobalRuntimeValue('abort') === "");
	    }
	},

    // VM active
	isActive: function(vmState) {
	    var activeStates = ["running", "on"];
	    var lowerVmState = vmState.toLowerCase();
	    var active = $.inArray(lowerVmState, activeStates) > -1;
		return active;
	},

	nodeNodeCssClass: function(nodeName) {
		var globalAbort = !(this.getGlobalRuntimeValue('state') === "");
		var abort = false;
		if(globalAbort) {
			// find if vms under this node are the cause
			var multiplicity = this.getRuntimeValue(nodeName + ".1", "multiplicity");
			for(var i=1;i<=multiplicity;i++) {
				if(this.isAbort(nodeName + "." + i)) {
					abort = true;
					break;
				}
			}
		}
		return "dashboard-icon dashboard-node " + ((abort) ? 'dashboard-error' : 'dashboard-ok');
	},

    isUrlProperty: function(propertyName) {
        var pattern = /[^:]+:url\..*/;
        return pattern.test(propertyName);
    },

    updateProperty: function(propertyName, value) {
		var name = propertyName.replace(':', '\\:').replace('.', '\\.');
		var valueTd = $('#' + name);
		if(this.isUrlProperty(propertyName) && value !== '') {
		    $(valueTd).html('<a href="' + value + '">' + value + '</a>');
		} else {
		    $(valueTd).text(value);
		}
    },

	extractNodeName: function(vmname) {
		return vmname.split('.')[0];
	},

	updateCompletedNodesInfo: function(nodename, completed) {
		this.nodesInfo[nodename] = this.nodesInfo[nodename] || {};
		var noOfCompleted = this.nodesInfo[nodename].completed || 0;
		if(completed === 'true') {
			noOfCompleted++;
		}
		this.nodesInfo[nodename].completed = noOfCompleted;
	},

	setMultiplicityNodesInfo: function(nodename, multiplicity) {
		this.nodesInfo[nodename].multiplicity = multiplicity;
	},

	getIdPrefix: function(name) {
		return "dashboard-" + name;
	},

	getCssClass: function(abort) {
		return "dashboard-icon dashboard-image " + ((abort) ? 'dashboard-error' : 'dashboard-ok');
	},

    // power icon reflecting if the vm is on/running
	getActiveCssClass: function(vmState) {
		return "vm " + (this.isActive(vmState) ? 'vm-active' : 'vm-inactive');
	},

    updateVm: function(params) {
		// Update node info (to display the (x/y) in the node dashboard box)
		var vmname = params.name;
		var nodename = this.extractNodeName(vmname);
		this.updateCompletedNodesInfo(nodename, params.completed);
		if(params.name.endsWith('.1')) {
			this.setMultiplicityNodesInfo(nodename, params.multiplicity);
		}

		var idprefix = this.escapeDot(this.getIdPrefix(params.name));

        $('#' + idprefix + '-state').text("State: " + params.state);
        $('#' + idprefix + '-statecustom').text(params.statecustom);

        // Set the icon
        $('#' + idprefix).attr('class', this.getCssClass(params.abort));
        $('#' + idprefix + " ul").attr('class', this.getActiveCssClass(params.vmstate));
    },

	updateNode: function(nodename) {
		var idprefix = this.getIdPrefix(nodename);
		var nodeinfo = this.nodesInfo[nodename];
        $('#' + idprefix + '-ratio').text("State: " + this.getRuntimeValue(nodename + '.1', 'state') + " (" + nodeinfo.completed + "/" + nodeinfo.multiplicity + ")");
        // Set the icon
        $('#' + idprefix).attr('class', this.nodeNodeCssClass(nodename));
	},

	updateOchestrator: function(nodename) {
		var idprefix = this.getIdPrefix(nodename);
        $('#' + idprefix + '-state').text("State: " + this.getRuntimeValue(nodename, 'state'));
        $('#' + idprefix).attr('class', this.getCssClass(this.isAbort(nodename)));
	},

	truncate: function(message) {
	    var maxStringSize = 18;
	    if (message.length > maxStringSize) {
	        var firstPart = message.substr(0, maxStringSize / 2 - 2);
	        var lastPart = message.substr(message.length - maxStringSize / 2 + 2, message.length - 1);
	        message = firstPart + '...' + lastPart;
	    }
		return message;
	},

    escapeDot: function(value) {
        return value.replace('.', '\\.');
    },

	buildParamsFromXmlRun: function(vmname, run) {
		var params = {};
		var escapedVmName = this.escapeDot(vmname);
		params.name = vmname;
		params.abort = $(run).find("runtimeParameter[key='" + escapedVmName + ":abort']").text();
		params.state = $(run).find("runtimeParameter[key='" + escapedVmName + ":state']").text();
		params.statemessage = $(run).find("runtimeParameter[key='" + escapedVmName + ":statemessage']").text();
		params.statecustom = this.truncate($(run).find("runtimeParameter[key='" + escapedVmName + ":statecustom']").text());
		params.vmstate = $(run).find("runtimeParameter[key='" + escapedVmName + ":vmstate']").text();
		params.completed = $(run).find("runtimeParameter[key='" + escapedVmName + ":complete']").text();
		params.multiplicity = $(run).find("runtimeParameter[key='" + escapedVmName + ":multiplicity']").text();
		return params;
	},

	buildParamsFromLocalRun: function(vmname) {
		var params = {};
		params.name = vmname;
		vmname = vmname.replace(':', '\\:').replace('.', '\\.');
		params.abort = $('#' + vmname + "\\:abort").text();
		params.state = $('#' + vmname + "\\:state").text();
		params.statemessage = $('#' + vmname + "\\:statemessage").text();
		params.statecustom = $('#' + vmname + "\\:statecustom").text();
		params.vmstate = $('#' + vmname + "\\:vmstate").text();
		params.completed = $('#' + vmname + "\\:completed").text();
		params.multiplicity = $('#' + vmname + "\\:multiplicity").text();
		return params;
	},

    updateDashboard: function() {

        var that = this;

        var callback = function(data, textStatus, jqXHR) {

	        var run = $(data).find("run");
			that.nodesInfo = {};

	        // Update general status and header
	        var newStatus = $(run).attr('state');
	        $('#state').text(newStatus);
            $("#header-title-desc").text("State: " + newStatus);

            var headerTitle = $('#header-title');
            if(that.isAbort()) {
                headerTitle.addClass('dashboard-error');
            } else {
                headerTitle.removeClass('dashboard-error');
            }

            // Update the global deployment link.
            var linkDiv = $('#header-title-link');
            var serviceLink = that.getGlobalRuntimeValue('url.service');
            if(serviceLink !== undefined && serviceLink !== '') {
                linkDiv.attr('class', 'url-service-set');
                linkDiv.html('<a href="' + serviceLink + '"></a>');
            } else {
                linkDiv.attr('class', 'url-service-unset');
            }

	        var runtimeParameters = $(run).find('runtimeParameter');
			runtimeParameters.each(function (i, parameter) {
                var key = $(parameter).attr('key');
                var value = $(parameter).text();
                that.updateProperty(key, value);
	        });

			var nodeNames = $(run).attr('nodeNames');
            nodeNames = nodeNames.split(', ');

            for (var i in nodeNames) {
                var vmname = nodeNames[i].trim();
                if(vmname === "") {
                    continue;
                }
                var params = that.buildParamsFromXmlRun(vmname, run);
                that.updateVm(params)
            }

            for (var nodename in that.nodesInfo) {
                if(nodename.startsWith('orchestrator-')) {
                    that.updateOchestrator(nodename);
                } else if(nodename != 'machine'){ // machine doesn't have node
                    that.updateNode(nodename);
                }
            }
        };

		$.get(location.href, callback, 'xml');
    }
}

function updateReports() {
	// force reload, since reports might have updated since
	// last time
	var iframe = $('#reports > iframe');
	var url = iframe.attr('src');
	iframe.attr('src',url);
}

function updateDashboard() {
    dashboardUpdater.updateDashboard();
    updateReports();
    setTimeout("updateDashboard()", 10000);
}
