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

    // Edit button
    $('#edit-button-top, #edit-button-bottom').click(function(event){
		window.location = '?edit=true';
    });	
	
    // Build
    $('#build-button-top, #build-button-bottom').click(function(event){
    	$$.hideError();
		$$.showSubmitMessage("Requesting Build Image");
		$("#build-form").submit();
    });	

    $('#build-form').submit(function(event){
        return $$.send($(this), event, $.post);
    });
	
	// Run
    $('#run-button-top, #run-button-bottom').click(function(event){
    	$$.hideError();
		$$.showSubmitMessage("Starting Image");
		$$.send($("#run-form"), event, $.post);
		return false;
    });	
	
    // Publish button
    $('#publish-button-top, #publish-button-bottom').click(function(event){
    	$$.hideError();
		return $$.send($('#publish-form'), null, $.put);
    });	

    // Un-Publish button
    $('#unpublish-button-top, #unpublish-button-bottom').click(function(event){
    	$$.hideError();
		$$.send($('#publish-form'), null, $.delete_, function() {
			location.reload();
	    });
		return false;
    });	
	
	$$.activateCopyTo();
	
	textarea2sceditor('#execute', true);
    textarea2sceditor('#report', true);
    textarea2sceditor('#recipe', true);
    textarea2sceditor('#prerecipe', true);
    
})
