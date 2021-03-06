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

    // Save button
    $('#save-button-top, #save-button-bottom').click(function(event){
    	$$.hideError();
		$$.send($("#form-save"), event, $.put);
    	return false;
    });

    // Cancel button
    $('#cancel-button-top, #cancel-button-bottom').click(function(event){
    	window.location = location.pathname;
    	return false;
    });	

    // Delete button
    $('#delete-button-top, #delete-button-bottom').click(function(event){
    	event.preventDefault();
    	$$.hideError();
    	$('#delete-user-dialog').dialog('open');
    	return false;
    });	

    $('#delete-user-dialog').dialog({
    	autoOpen: false,
    	title: 'Delete User?',
    	modal: true,
    	buttons: {
    		"Cancel": function() {
    			$(this).dialog("close");
    		},
    		"Delete": function() {
    			$(this).dialog("close");
    			$.delete_();
    		},
    	}
    });

})
