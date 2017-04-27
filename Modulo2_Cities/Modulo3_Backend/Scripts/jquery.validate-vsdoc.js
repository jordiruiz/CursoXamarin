/*
* This file has been commented to support Visual Studio Intellisense.
* You should not use this file at runtime inside the browser--it is only
* intended to be used only for design-time IntelliSense.  Please use the
* standard jQuery library for all production use.
*
* Comment version: 1.16.0
*/

/*
* Note: While Microsoft is not the author of this file, Microsoft is
* offering you a license subject to the terms of the Microsoft Software
* License Terms for Microsoft ASP.NET Model View Controller 3.
* Microsoft reserves all other rights. The notices below are provided
* for informational purposes only and are not the license terms under
* which Microsoft distributed this file.
*
* jQuery Validation Plugin - v1.16.0 - 12/5/2016
* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jörn Zaefferer; Licensed MIT
*
*/

(function($) ***REMOVED***

$.extend($.fn, ***REMOVED***
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) ***REMOVED***
		/// <summary>
		/// Validates the selected form. This method sets up event handlers for submit, focus,
		/// keyup, blur and click to trigger validation of the entire form or individual
		/// elements. Each one can be disabled, see the onxxx options (onsubmit, onfocusout,
		/// onkeyup, onclick). focusInvalid focuses elements when submitting a invalid form.
		/// </summary>
		/// <param name="options" type="Object">
		/// A set of key/value pairs that configure the validate. All options are optional.
		/// </param>

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) ***REMOVED***
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		***REMOVED***

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) ***REMOVED***
			return validator;
		***REMOVED***
		
		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator); 
		
		if ( validator.settings.onsubmit ) ***REMOVED***
		
			// allow suppresing validation by adding a cancel class to the submit button
			this.find("input, button").filter(".cancel").click(function() ***REMOVED***
				validator.cancelSubmit = true;
			***REMOVED***);
			
			// when a submitHandler is used, capture the submitting button
			if (validator.settings.submitHandler) ***REMOVED***
				this.find("input, button").filter(":submit").click(function() ***REMOVED***
					validator.submitButton = this;
				***REMOVED***);
			***REMOVED***
		
			// validate the form on submit
			this.submit( function( event ) ***REMOVED***
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();
					
				function handle() ***REMOVED***
					if ( validator.settings.submitHandler ) ***REMOVED***
						if (validator.submitButton) ***REMOVED***
							// insert a hidden input as a replacement for the missing submit button
							var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						***REMOVED***
						validator.settings.submitHandler.call( validator, validator.currentForm );
						if (validator.submitButton) ***REMOVED***
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						***REMOVED***
						return false;
					***REMOVED***
					return true;
				***REMOVED***
					
				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) ***REMOVED***
					validator.cancelSubmit = false;
					return handle();
				***REMOVED***
				if ( validator.form() ) ***REMOVED***
					if ( validator.pendingRequest ) ***REMOVED***
						validator.formSubmitted = true;
						return false;
					***REMOVED***
					return handle();
				***REMOVED*** else ***REMOVED***
					validator.focusInvalid();
					return false;
				***REMOVED***
			***REMOVED***);
		***REMOVED***
		
		return validator;
	***REMOVED***,
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() ***REMOVED***
		/// <summary>
		/// Checks if the selected form is valid or if all selected elements are valid.
		/// validate() needs to be called on the form before checking it using this method.
		/// </summary>
		/// <returns type="Boolean" />

        if ( $(this[0]).is('form')) ***REMOVED***
            return this.validate().form();
    ***REMOVED*** else ***REMOVED***
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() ***REMOVED***
				valid &= validator.element(this);
        ***REMOVED***);
            return valid;
    ***REMOVED***
***REMOVED***,
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) ***REMOVED***
		/// <summary>
		/// Remove the specified attributes from the first matched element and return them.
		/// </summary>
		/// <param name="attributes" type="String">
		/// A space-seperated list of attribute names to remove.
		/// </param>

		var result = ***REMOVED******REMOVED***,
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) ***REMOVED***
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		***REMOVED***);
		return result;
	***REMOVED***,
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) ***REMOVED***
		/// <summary>
		/// Return the validations rules for the first selected element.
		/// </summary>
		/// <param name="command" type="String">
		/// Can be either "add" or "remove".
		/// </param>
		/// <param name="argument" type="">
		/// A list of rules to add or remove.
		/// </param>

		var element = this[0];
		
		if (command) ***REMOVED***
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) ***REMOVED***
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) ***REMOVED***
					delete staticRules[element.name];
					return existingRules;
				***REMOVED***
				var filtered = ***REMOVED******REMOVED***;
				$.each(argument.split(/\s/), function(index, method) ***REMOVED***
					filtered[method] = existingRules[method];
					delete existingRules[method];
				***REMOVED***);
				return filtered;
			***REMOVED***
		***REMOVED***
		
		var data = $.validator.normalizeRules(
		$.extend(
			***REMOVED******REMOVED***,
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);
		
		// make sure required is at front
		if (data.required) ***REMOVED***
			var param = data.required;
			delete data.required;
			data = $.extend(***REMOVED***required: param***REMOVED***, data);
		***REMOVED***
		
		return data;
	***REMOVED***
***REMOVED***);

// Custom selectors
$.extend($.expr[":"], ***REMOVED***
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) ***REMOVED***return !$.trim("" + a.value);***REMOVED***,
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) ***REMOVED***return !!$.trim("" + a.value);***REMOVED***,
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) ***REMOVED***return !a.checked;***REMOVED***
***REMOVED***);

// constructor for validator
$.validator = function( options, form ) ***REMOVED***
	this.settings = $.extend( true, ***REMOVED******REMOVED***, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
***REMOVED***;

$.validator.format = function(source, params) ***REMOVED***
	/// <summary>
	/// Replaces ***REMOVED***n***REMOVED*** placeholders with arguments.
	/// One or more arguments can be passed, in addition to the string template itself, to insert
	/// into the string.
	/// </summary>
	/// <param name="source" type="String">
	/// The string to format.
	/// </param>
	/// <param name="params" type="String">
	/// The first argument to insert, or an array of Strings to insert
	/// </param>
	/// <returns type="String" />

	if ( arguments.length == 1 ) 
		return function() ***REMOVED***
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		***REMOVED***;
	if ( arguments.length > 2 && params.constructor != Array  ) ***REMOVED***
		params = $.makeArray(arguments).slice(1);
	***REMOVED***
	if ( params.constructor != Array ) ***REMOVED***
		params = [ params ];
	***REMOVED***
	$.each(params, function(i, n) ***REMOVED***
		source = source.replace(new RegExp("\\***REMOVED***" + i + "\\***REMOVED***", "g"), n);
	***REMOVED***);
	return source;
***REMOVED***;

$.extend($.validator, ***REMOVED***
	
	defaults: ***REMOVED***
		messages: ***REMOVED******REMOVED***,
		groups: ***REMOVED******REMOVED***,
		rules: ***REMOVED******REMOVED***,
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: [],
		ignoreTitle: false,
		onfocusin: function(element) ***REMOVED***
			this.lastActive = element;
				
			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) ***REMOVED***
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				this.addWrapper(this.errorsFor(element)).hide();
			***REMOVED***
		***REMOVED***,
		onfocusout: function(element) ***REMOVED***
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) ***REMOVED***
				this.element(element);
			***REMOVED***
		***REMOVED***,
		onkeyup: function(element) ***REMOVED***
			if ( element.name in this.submitted || element == this.lastElement ) ***REMOVED***
				this.element(element);
			***REMOVED***
		***REMOVED***,
		onclick: function(element) ***REMOVED***
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted )
				this.element(element);
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted)
				this.element(element.parentNode);
		***REMOVED***,
		highlight: function( element, errorClass, validClass ) ***REMOVED***
			$(element).addClass(errorClass).removeClass(validClass);
		***REMOVED***,
		unhighlight: function( element, errorClass, validClass ) ***REMOVED***
			$(element).removeClass(errorClass).addClass(validClass);
		***REMOVED***
	***REMOVED***,

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) ***REMOVED***
		/// <summary>
		/// Modify default settings for validation.
		/// Accepts everything that Plugins/Validation/validate accepts.
		/// </summary>
		/// <param name="settings" type="Options">
		/// Options to set as default.
		/// </param>

		$.extend( $.validator.defaults, settings );
	***REMOVED***,

	messages: ***REMOVED***
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.validator.format("Please enter no more than ***REMOVED***0***REMOVED*** characters."),
		minlength: $.validator.format("Please enter at least ***REMOVED***0***REMOVED*** characters."),
		rangelength: $.validator.format("Please enter a value between ***REMOVED***0***REMOVED*** and ***REMOVED***1***REMOVED*** characters long."),
		range: $.validator.format("Please enter a value between ***REMOVED***0***REMOVED*** and ***REMOVED***1***REMOVED***."),
		max: $.validator.format("Please enter a value less than or equal to ***REMOVED***0***REMOVED***."),
		min: $.validator.format("Please enter a value greater than or equal to ***REMOVED***0***REMOVED***.")
	***REMOVED***,
	
	autoCreateRanges: false,
	
	prototype: ***REMOVED***
		
		init: function() ***REMOVED***
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = ***REMOVED******REMOVED***;
			this.valueCache = ***REMOVED******REMOVED***;
			this.pendingRequest = 0;
			this.pending = ***REMOVED******REMOVED***;
			this.invalid = ***REMOVED******REMOVED***;
			this.reset();
			
			var groups = (this.groups = ***REMOVED******REMOVED***);
			$.each(this.settings.groups, function(key, value) ***REMOVED***
				$.each(value.split(/\s/), function(index, name) ***REMOVED***
					groups[name] = key;
				***REMOVED***);
			***REMOVED***);
			var rules = this.settings.rules;
			$.each(rules, function(key, value) ***REMOVED***
				rules[key] = $.validator.normalizeRule(value);
			***REMOVED***);
			
			function delegate(event) ***REMOVED***
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				validator.settings[eventType] && validator.settings[eventType].call(validator, this[0] );
			***REMOVED***
			$(this.currentForm)
				.validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", delegate)
				.validateDelegate(":radio, :checkbox, select, option", "click", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() ***REMOVED***
			/// <summary>
			/// Validates the form, returns true if it is valid, false otherwise.
			/// This behaves as a normal submit event, but returns the result.
			/// </summary>
			/// <returns type="Boolean" />

			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend(***REMOVED******REMOVED***, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		***REMOVED***,
		
		checkForm: function() ***REMOVED***
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) ***REMOVED***
				this.check( elements[i] );
			***REMOVED***
			return this.valid(); 
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) ***REMOVED***
			/// <summary>
			/// Validates a single element, returns true if it is valid, false otherwise.
			/// This behaves as validation on blur or keyup, but returns the result.
			/// </summary>
			/// <param name="element" type="Selector">
			/// An element to validate, must be inside the validated form.
			/// </param>
			/// <returns type="Boolean" />

			element = this.clean( element );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) ***REMOVED***
				delete this.invalid[element.name];
			***REMOVED*** else ***REMOVED***
				this.invalid[element.name] = true;
			***REMOVED***
			if ( !this.numberOfInvalids() ) ***REMOVED***
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			***REMOVED***
			this.showErrors();
			return result;
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) ***REMOVED***
			/// <summary>
			/// Show the specified messages.
			/// Keys have to refer to the names of elements, values are displayed for those elements, using the configured error placement.
			/// </summary>
			/// <param name="errors" type="Object">
			/// One or more key/value pairs of input names and messages.
			/// </param>

			if(errors) ***REMOVED***
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) ***REMOVED***
					this.errorList.push(***REMOVED***
						message: errors[name],
						element: this.findByName(name)[0]
					***REMOVED***);
				***REMOVED***
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) ***REMOVED***
					return !(element.name in errors);
				***REMOVED***);
			***REMOVED***
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() ***REMOVED***
			/// <summary>
			/// Resets the controlled form.
			/// Resets input fields to their original value (requires form plugin), removes classes
			/// indicating invalid elements and hides error messages.
			/// </summary>

			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = ***REMOVED******REMOVED***;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		***REMOVED***,
		
		numberOfInvalids: function() ***REMOVED***
			/// <summary>
			/// Returns the number of invalid fields.
			/// This depends on the internal validator state. It covers all fields only after
			/// validating the complete form (on submit or via $("form").valid()). After validating
			/// a single element, only that element is counted. Most useful in combination with the
			/// invalidHandler-option.
			/// </summary>
			/// <returns type="Number" />

			return this.objectLength(this.invalid);
		***REMOVED***,
		
		objectLength: function( obj ) ***REMOVED***
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		***REMOVED***,
		
		hideErrors: function() ***REMOVED***
			this.addWrapper( this.toHide ).hide();
		***REMOVED***,
		
		valid: function() ***REMOVED***
			return this.size() == 0;
		***REMOVED***,
		
		size: function() ***REMOVED***
			return this.errorList.length;
		***REMOVED***,
		
		focusInvalid: function() ***REMOVED***
			if( this.settings.focusInvalid ) ***REMOVED***
				try ***REMOVED***
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				***REMOVED*** catch(e) ***REMOVED***
					// ignore IE throwing errors when focusing hidden elements
				***REMOVED***
			***REMOVED***
		***REMOVED***,
		
		findLastActive: function() ***REMOVED***
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) ***REMOVED***
				return n.element.name == lastActive.name;
			***REMOVED***).length == 1 && lastActive;
		***REMOVED***,
		
		elements: function() ***REMOVED***
			var validator = this,
				rulesCache = ***REMOVED******REMOVED***;
			
			// select all valid inputs inside the form (no submit or reset buttons)
			// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
			return $([]).add(this.currentForm.elements)
			.filter(":input")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() ***REMOVED***
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);
			
				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;
				
				rulesCache[this.name] = true;
				return true;
			***REMOVED***);
		***REMOVED***,
		
		clean: function( selector ) ***REMOVED***
			return $( selector )[0];
		***REMOVED***,
		
		errors: function() ***REMOVED***
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		***REMOVED***,
		
		reset: function() ***REMOVED***
			this.successList = [];
			this.errorList = [];
			this.errorMap = ***REMOVED******REMOVED***;
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		***REMOVED***,
		
		prepareForm: function() ***REMOVED***
			this.reset();
			this.toHide = this.errors().add( this.containers );
		***REMOVED***,
		
		prepareElement: function( element ) ***REMOVED***
			this.reset();
			this.toHide = this.errorsFor(element);
		***REMOVED***,
	
		check: function( element ) ***REMOVED***
			element = this.clean( element );
			
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) ***REMOVED***
			    element = this.findByName(element.name).not(this.settings.ignore)[0];
			***REMOVED***
			
			var rules = $(element).rules();
			var dependencyMismatch = false;
			for (var method in rules) ***REMOVED***
				var rule = ***REMOVED*** method: method, parameters: rules[method] ***REMOVED***;
				try ***REMOVED***
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );
					
					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) ***REMOVED***
						dependencyMismatch = true;
						continue;
					***REMOVED***
					dependencyMismatch = false;
					
					if ( result == "pending" ) ***REMOVED***
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					***REMOVED***
					
					if( !result ) ***REMOVED***
						this.formatAndAdd( element, rule );
						return false;
					***REMOVED***
				***REMOVED*** catch(e) ***REMOVED***
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				***REMOVED***
			***REMOVED***
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		***REMOVED***,
		
		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) ***REMOVED***
			if (!$.metadata)
				return;
			
			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();
			
			return meta && meta.messages && meta.messages[method];
		***REMOVED***,
		
		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) ***REMOVED***
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		***REMOVED***,
		
		// return the first defined argument, allowing empty strings
		findDefined: function() ***REMOVED***
			for(var i = 0; i < arguments.length; i++) ***REMOVED***
				if (arguments[i] !== undefined)
					return arguments[i];
			***REMOVED***
			return undefined;
		***REMOVED***,
		
		defaultMessage: function( element, method) ***REMOVED***
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		***REMOVED***,
		
		formatAndAdd: function( element, rule ) ***REMOVED***
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\***REMOVED***(\d+)\***REMOVED***/g;
			if ( typeof message == "function" ) ***REMOVED***
				message = message.call(this, rule.parameters, element);
			***REMOVED*** else if (theregex.test(message)) ***REMOVED***
				message = jQuery.format(message.replace(theregex, '***REMOVED***$1***REMOVED***'), rule.parameters);
			***REMOVED***			
			this.errorList.push(***REMOVED***
				message: message,
				element: element
			***REMOVED***);
			
			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		***REMOVED***,
		
		addWrapper: function(toToggle) ***REMOVED***
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		***REMOVED***,
		
		defaultShowErrors: function() ***REMOVED***
			for ( var i = 0; this.errorList[i]; i++ ) ***REMOVED***
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			***REMOVED***
			if( this.errorList.length ) ***REMOVED***
				this.toShow = this.toShow.add( this.containers );
			***REMOVED***
			if (this.settings.success) ***REMOVED***
				for ( var i = 0; this.successList[i]; i++ ) ***REMOVED***
					this.showLabel( this.successList[i] );
				***REMOVED***
			***REMOVED***
			if (this.settings.unhighlight) ***REMOVED***
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) ***REMOVED***
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				***REMOVED***
			***REMOVED***
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		***REMOVED***,
		
		validElements: function() ***REMOVED***
			return this.currentElements.not(this.invalidElements());
		***REMOVED***,
		
		invalidElements: function() ***REMOVED***
			return $(this.errorList).map(function() ***REMOVED***
				return this.element;
			***REMOVED***);
		***REMOVED***,
		
		showLabel: function(element, message) ***REMOVED***
			var label = this.errorsFor( element );
			if ( label.length ) ***REMOVED***
				// refresh error/success class
				label.removeClass().addClass( this.settings.errorClass );
			
				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			***REMOVED*** else ***REMOVED***
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr(***REMOVED***"for":  this.idOrName(element), generated: true***REMOVED***)
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) ***REMOVED***
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				***REMOVED***
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			***REMOVED***
			if ( !message && this.settings.success ) ***REMOVED***
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			***REMOVED***
			this.toShow = this.toShow.add(label);
		***REMOVED***,
		
		errorsFor: function(element) ***REMOVED***
			var name = this.idOrName(element);
    		return this.errors().filter(function() ***REMOVED***
				return $(this).attr('for') == name;
			***REMOVED***);
		***REMOVED***,
		
		idOrName: function(element) ***REMOVED***
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		***REMOVED***,

		checkable: function( element ) ***REMOVED***
			return /radio|checkbox/i.test(element.type);
		***REMOVED***,
		
		findByName: function( name ) ***REMOVED***
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) ***REMOVED***
				return element.form == form && element.name == name && element  || null;
			***REMOVED***);
		***REMOVED***,
		
		getLength: function(value, element) ***REMOVED***
			switch( element.nodeName.toLowerCase() ) ***REMOVED***
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			***REMOVED***
			return value.length;
		***REMOVED***,
	
		depend: function(param, element) ***REMOVED***
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		***REMOVED***,
	
		dependTypes: ***REMOVED***
			"boolean": function(param, element) ***REMOVED***
				return param;
			***REMOVED***,
			"string": function(param, element) ***REMOVED***
				return !!$(param, element.form).length;
			***REMOVED***,
			"function": function(param, element) ***REMOVED***
				return param(element);
			***REMOVED***
		***REMOVED***,
		
		optional: function(element) ***REMOVED***
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		***REMOVED***,
		
		startRequest: function(element) ***REMOVED***
			if (!this.pending[element.name]) ***REMOVED***
				this.pendingRequest++;
				this.pending[element.name] = true;
			***REMOVED***
		***REMOVED***,
		
		stopRequest: function(element, valid) ***REMOVED***
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) ***REMOVED***
				$(this.currentForm).submit();
				this.formSubmitted = false;
			***REMOVED*** else if (!valid && this.pendingRequest == 0 && this.formSubmitted) ***REMOVED***
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			***REMOVED***
		***REMOVED***,
		
		previousValue: function(element) ***REMOVED***
			return $.data(element, "previousValue") || $.data(element, "previousValue", ***REMOVED***
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			***REMOVED***);
		***REMOVED***
		
	***REMOVED***,
	
	classRuleSettings: ***REMOVED***
		required: ***REMOVED***required: true***REMOVED***,
		email: ***REMOVED***email: true***REMOVED***,
		url: ***REMOVED***url: true***REMOVED***,
		date: ***REMOVED***date: true***REMOVED***,
		dateISO: ***REMOVED***dateISO: true***REMOVED***,
		dateDE: ***REMOVED***dateDE: true***REMOVED***,
		number: ***REMOVED***number: true***REMOVED***,
		numberDE: ***REMOVED***numberDE: true***REMOVED***,
		digits: ***REMOVED***digits: true***REMOVED***,
		creditcard: ***REMOVED***creditcard: true***REMOVED***
	***REMOVED***,
	
	addClassRules: function(className, rules) ***REMOVED***
		/// <summary>
		/// Add a compound class method - useful to refactor common combinations of rules into a single
		/// class.
		/// </summary>
		/// <param name="name" type="String">
		/// The name of the class rule to add
		/// </param>
		/// <param name="rules" type="Options">
		/// The compound rules
		/// </param>

		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	***REMOVED***,
	
	classRules: function(element) ***REMOVED***
		var rules = ***REMOVED******REMOVED***;
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() ***REMOVED***
			if (this in $.validator.classRuleSettings) ***REMOVED***
				$.extend(rules, $.validator.classRuleSettings[this]);
			***REMOVED***
		***REMOVED***);
		return rules;
	***REMOVED***,
	
	attributeRules: function(element) ***REMOVED***
		var rules = ***REMOVED******REMOVED***;
		var $element = $(element);

		for (var method in $.validator.methods) ***REMOVED***
			var value = $element.attr(method);
			if (value) ***REMOVED***
				rules[method] = value;
			***REMOVED***
		***REMOVED***
		
		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) ***REMOVED***
			delete rules.maxlength;
		***REMOVED***
		
		return rules;
	***REMOVED***,
	
	metadataRules: function(element) ***REMOVED***
		if (!$.metadata) return ***REMOVED******REMOVED***;
		
		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	***REMOVED***,
	
	staticRules: function(element) ***REMOVED***
		var rules = ***REMOVED******REMOVED***;
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) ***REMOVED***
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || ***REMOVED******REMOVED***;
		***REMOVED***
		return rules;
	***REMOVED***,
	
	normalizeRules: function(rules, element) ***REMOVED***
		// handle dependency check
		$.each(rules, function(prop, val) ***REMOVED***
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) ***REMOVED***
				delete rules[prop];
				return;
			***REMOVED***
			if (val.param || val.depends) ***REMOVED***
				var keepRule = true;
				switch (typeof val.depends) ***REMOVED***
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				***REMOVED***
				if (keepRule) ***REMOVED***
					rules[prop] = val.param !== undefined ? val.param : true;
				***REMOVED*** else ***REMOVED***
					delete rules[prop];
				***REMOVED***
			***REMOVED***
		***REMOVED***);
		
		// evaluate parameters
		$.each(rules, function(rule, parameter) ***REMOVED***
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		***REMOVED***);
		
		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() ***REMOVED***
			if (rules[this]) ***REMOVED***
				rules[this] = Number(rules[this]);
			***REMOVED***
		***REMOVED***);
		$.each(['rangelength', 'range'], function() ***REMOVED***
			if (rules[this]) ***REMOVED***
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			***REMOVED***
		***REMOVED***);
		
		if ($.validator.autoCreateRanges) ***REMOVED***
			// auto-create ranges
			if (rules.min && rules.max) ***REMOVED***
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			***REMOVED***
			if (rules.minlength && rules.maxlength) ***REMOVED***
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			***REMOVED***
		***REMOVED***
		
		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) ***REMOVED***
			delete rules.messages;
		***REMOVED***
		
		return rules;
	***REMOVED***,
	
	// Converts a simple string to a ***REMOVED***string: true***REMOVED*** rule, e.g., "required" to ***REMOVED***required:true***REMOVED***
	normalizeRule: function(data) ***REMOVED***
		if( typeof data == "string" ) ***REMOVED***
			var transformed = ***REMOVED******REMOVED***;
			$.each(data.split(/\s/), function() ***REMOVED***
				transformed[this] = true;
			***REMOVED***);
			data = transformed;
		***REMOVED***
		return data;
	***REMOVED***,
	
	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) ***REMOVED***
		/// <summary>
		/// Add a custom validation method. It must consist of a name (must be a legal javascript 
		/// identifier), a javascript based function and a default string message.
		/// </summary>
		/// <param name="name" type="String">
		/// The name of the method, used to identify and referencing it, must be a valid javascript
		/// identifier
		/// </param>
		/// <param name="method" type="Function">
		/// The actual method implementation, returning true if an element is valid
		/// </param>
		/// <param name="message" type="String" optional="true">
		/// (Optional) The default message to display for this method. Can be a function created by 
		/// jQuery.validator.format(value). When undefined, an already existing message is used 
		/// (handy for localization), otherwise the field-specific messages have to be defined.
		/// </param>

		$.validator.methods[name] = method;
		$.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
		if (method.length < 3) ***REMOVED***
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		***REMOVED***
	***REMOVED***,

	methods: ***REMOVED***

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) ***REMOVED***
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) ***REMOVED***
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			***REMOVED***
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) ***REMOVED***
			if ( this.optional(element) )
				return "dependency-mismatch";
			
			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = ***REMOVED******REMOVED***;
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;
			
			param = typeof param == "string" && ***REMOVED***url:param***REMOVED*** || param; 
			
			if ( this.pending[element.name] ) ***REMOVED***
				return "pending";
			***REMOVED***
			if ( previous.old === value ) ***REMOVED***
				return previous.valid;
			***REMOVED***

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = ***REMOVED******REMOVED***;
			data[element.name] = value;
			$.ajax($.extend(true, ***REMOVED***
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) ***REMOVED***
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true;
					if ( valid ) ***REMOVED***
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						validator.showErrors();
					***REMOVED*** else ***REMOVED***
						var errors = ***REMOVED******REMOVED***;
						var message = response || validator.defaultMessage(element, "remote");
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.showErrors(errors);
					***REMOVED***
					previous.valid = valid;
					validator.stopRequest(element, valid);
				***REMOVED***
			***REMOVED***, param));
			return "pending";
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) ***REMOVED***
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) ***REMOVED***
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) ***REMOVED***
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) ***REMOVED***
			return this.optional(element) || value >= param;
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) ***REMOVED***
			return this.optional(element) || value <= param;
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) ***REMOVED***
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) ***REMOVED***
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`***REMOVED***\|***REMOVED***~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`***REMOVED***\|***REMOVED***~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
		***REMOVED***,
	
		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) ***REMOVED***
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		***REMOVED***,
        
		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) ***REMOVED***
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		***REMOVED***,
	
		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) ***REMOVED***
			return this.optional(element) || /^\d***REMOVED***4***REMOVED***[\/-]\d***REMOVED***1,2***REMOVED***[\/-]\d***REMOVED***1,2***REMOVED***$/.test(value);
		***REMOVED***,
	
		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) ***REMOVED***
			return this.optional(element) || /^-?(?:\d+|\d***REMOVED***1,3***REMOVED***(?:,\d***REMOVED***3***REMOVED***)+)(?:\.\d+)?$/.test(value);
		***REMOVED***,
	
		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) ***REMOVED***
			return this.optional(element) || /^\d+$/.test(value);
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) ***REMOVED***
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only digits and dashes
			if (/[^0-9-]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) ***REMOVED***
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) ***REMOVED***
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				***REMOVED***
				nCheck += nDigit;
				bEven = !bEven;
			***REMOVED***

			return (nCheck % 10) == 0;
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) ***REMOVED***
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i")); 
		***REMOVED***,
		
		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) ***REMOVED***
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() ***REMOVED***
				$(element).valid();
			***REMOVED***);
			return value == target.val();
		***REMOVED***
		
	***REMOVED***
	
***REMOVED***);

// deprecated, use $.validator.format instead
$.format = $.validator.format;

***REMOVED***)(jQuery);

// ajax mode: abort
// usage: $.ajax(***REMOVED*** mode: "abort"[, port: "uniqueport"]***REMOVED***);
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;(function($) ***REMOVED***
	var pendingRequests = ***REMOVED******REMOVED***;
		// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) ***REMOVED***
		$.ajaxPrefilter(function(settings, _, xhr) ***REMOVED***
		    var port = settings.port;
		    if (settings.mode == "abort") ***REMOVED***
			    if ( pendingRequests[port] ) ***REMOVED***
				    pendingRequests[port].abort();
			***REMOVED***				pendingRequests[port] = xhr;
		***REMOVED***
	***REMOVED***);
	***REMOVED*** else ***REMOVED***
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) ***REMOVED***
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode == "abort") ***REMOVED***
				if ( pendingRequests[port] ) ***REMOVED***
					pendingRequests[port].abort();
				***REMOVED***

			    return (pendingRequests[port] = ajax.apply(this, arguments));
		***REMOVED***
		    return ajax.apply(this, arguments);
	***REMOVED***;
***REMOVED***
***REMOVED***)(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 
;(function($) ***REMOVED***
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) ***REMOVED***
		$.each(***REMOVED***
			focus: 'focusin',
			blur: 'focusout'	
		***REMOVED***, function( original, fix )***REMOVED***
			$.event.special[fix] = ***REMOVED***
				setup:function() ***REMOVED***
					this.addEventListener( original, handler, true );
				***REMOVED***,
				teardown:function() ***REMOVED***
					this.removeEventListener( original, handler, true );
				***REMOVED***,
				handler: function(e) ***REMOVED***
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				***REMOVED***
			***REMOVED***;
			function handler(e) ***REMOVED***
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			***REMOVED***
		***REMOVED***);
	***REMOVED***;
	$.extend($.fn, ***REMOVED***
		validateDelegate: function(delegate, type, handler) ***REMOVED***
			return this.bind(type, function(event) ***REMOVED***
				var target = $(event.target);
				if (target.is(delegate)) ***REMOVED***
					return handler.apply(target, arguments);
				***REMOVED***
			***REMOVED***);
		***REMOVED***
	***REMOVED***);
***REMOVED***)(jQuery);
