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

$(document).ready(function() {

    $('#save-button-top, #save-button-bottom').click(function(event){
    	$$.hideError();
		$("#save-form").submit();
    });	

	$('#reload-button-top, #reload-button-bottom').click(function(event){
		SS.hideError();
		$('#reload-configuration-dialog').dialog('open');
		return false;
	});

	$('#reload-configuration-dialog').dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			"Re-Load": function() {
				$(this).dialog("close");
				var callback = function(data, status, xhr) {
					window.location = location;
				}
				$.post(window.location.href, '', callback, 'text')
				return false;
			},
			"Cancel": function() {
				$(this).dialog("close");
			},
		}
	});
});