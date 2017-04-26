/* NUGET: BEGIN LICENSE TEXT
 *
 * Microsoft grants you the right to use these script files for the sole
 * purpose of either: (i) interacting through your browser with the Microsoft
 * website or online service, subject to the applicable licensing or use
 * terms; or (ii) using the files as included with a Microsoft product subject
 * to that product's license terms. Microsoft reserves all other rights to the
 * files not expressly granted by Microsoft, whether by implication, estoppel
 * or otherwise. Insofar as a script file is dual licensed under GPL,
 * Microsoft neither took the code under GPL nor distributes it thereunder but
 * under the terms set out in this paragraph. All notices and licenses
 * below are for informational purposes only.
 *
 * NUGET: END LICENSE TEXT */
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($) ***REMOVED***

$.extend($.fn, ***REMOVED***
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) ***REMOVED***

		// if nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) ***REMOVED***
			if ( options && options.debug && window.console ) ***REMOVED***
				console.warn( "Nothing selected, can't validate, returning nothing." );
			***REMOVED***
			return;
		***REMOVED***

		// check if a validator for this form was already created
		var validator = $.data( this[0], "validator" );
		if ( validator ) ***REMOVED***
			return validator;
		***REMOVED***

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[0] );
		$.data( this[0], "validator", validator );

		if ( validator.settings.onsubmit ) ***REMOVED***

			this.validateDelegate( ":submit", "click", function( event ) ***REMOVED***
				if ( validator.settings.submitHandler ) ***REMOVED***
					validator.submitButton = event.target;
				***REMOVED***
				// allow suppressing validation by adding a cancel class to the submit button
				if ( $(event.target).hasClass("cancel") ) ***REMOVED***
					validator.cancelSubmit = true;
				***REMOVED***

				// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $(event.target).attr("formnovalidate") !== undefined ) ***REMOVED***
					validator.cancelSubmit = true;
				***REMOVED***
			***REMOVED***);

			// validate the form on submit
			this.submit( function( event ) ***REMOVED***
				if ( validator.settings.debug ) ***REMOVED***
					// prevent form submit to be able to see console output
					event.preventDefault();
				***REMOVED***
				function handle() ***REMOVED***
					var hidden;
					if ( validator.settings.submitHandler ) ***REMOVED***
						if ( validator.submitButton ) ***REMOVED***
							// insert a hidden input as a replacement for the missing submit button
							hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val( $(validator.submitButton).val() ).appendTo(validator.currentForm);
						***REMOVED***
						validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) ***REMOVED***
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
		if ( $(this[0]).is("form")) ***REMOVED***
			return this.validate().form();
		***REMOVED*** else ***REMOVED***
			var valid = true;
			var validator = $(this[0].form).validate();
			this.each(function() ***REMOVED***
				valid = valid && validator.element(this);
			***REMOVED***);
			return valid;
		***REMOVED***
	***REMOVED***,
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function( attributes ) ***REMOVED***
		var result = ***REMOVED******REMOVED***,
			$element = this;
		$.each(attributes.split(/\s/), function( index, value ) ***REMOVED***
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		***REMOVED***);
		return result;
	***REMOVED***,
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function( command, argument ) ***REMOVED***
		var element = this[0];

		if ( command ) ***REMOVED***
			var settings = $.data(element.form, "validator").settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) ***REMOVED***
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				// remove messages from rules, but allow them to be set separetely
				delete existingRules.messages;
				staticRules[element.name] = existingRules;
				if ( argument.messages ) ***REMOVED***
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				***REMOVED***
				break;
			case "remove":
				if ( !argument ) ***REMOVED***
					delete staticRules[element.name];
					return existingRules;
				***REMOVED***
				var filtered = ***REMOVED******REMOVED***;
				$.each(argument.split(/\s/), function( index, method ) ***REMOVED***
					filtered[method] = existingRules[method];
					delete existingRules[method];
				***REMOVED***);
				return filtered;
			***REMOVED***
		***REMOVED***

		var data = $.validator.normalizeRules(
		$.extend(
			***REMOVED******REMOVED***,
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.dataRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if ( data.required ) ***REMOVED***
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
	blank: function( a ) ***REMOVED*** return !$.trim("" + $(a).val()); ***REMOVED***,
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function( a ) ***REMOVED*** return !!$.trim("" + $(a).val()); ***REMOVED***,
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function( a ) ***REMOVED*** return !$(a).prop("checked"); ***REMOVED***
***REMOVED***);

// constructor for validator
$.validator = function( options, form ) ***REMOVED***
	this.settings = $.extend( true, ***REMOVED******REMOVED***, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
***REMOVED***;

$.validator.format = function( source, params ) ***REMOVED***
	if ( arguments.length === 1 ) ***REMOVED***
		return function() ***REMOVED***
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		***REMOVED***;
	***REMOVED***
	if ( arguments.length > 2 && params.constructor !== Array  ) ***REMOVED***
		params = $.makeArray(arguments).slice(1);
	***REMOVED***
	if ( params.constructor !== Array ) ***REMOVED***
		params = [ params ];
	***REMOVED***
	$.each(params, function( i, n ) ***REMOVED***
		source = source.replace( new RegExp("\\***REMOVED***" + i + "\\***REMOVED***", "g"), function() ***REMOVED***
			return n;
		***REMOVED***);
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
		errorContainer: $([]),
		errorLabelContainer: $([]),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element, event ) ***REMOVED***
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) ***REMOVED***
				if ( this.settings.unhighlight ) ***REMOVED***
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				***REMOVED***
				this.addWrapper(this.errorsFor(element)).hide();
			***REMOVED***
		***REMOVED***,
		onfocusout: function( element, event ) ***REMOVED***
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) ***REMOVED***
				this.element(element);
			***REMOVED***
		***REMOVED***,
		onkeyup: function( element, event ) ***REMOVED***
			if ( event.which === 9 && this.elementValue(element) === "" ) ***REMOVED***
				return;
			***REMOVED*** else if ( element.name in this.submitted || element === this.lastElement ) ***REMOVED***
				this.element(element);
			***REMOVED***
		***REMOVED***,
		onclick: function( element, event ) ***REMOVED***
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) ***REMOVED***
				this.element(element);
			***REMOVED***
			// or option elements, check parent select in that case
			else if ( element.parentNode.name in this.submitted ) ***REMOVED***
				this.element(element.parentNode);
			***REMOVED***
		***REMOVED***,
		highlight: function( element, errorClass, validClass ) ***REMOVED***
			if ( element.type === "radio" ) ***REMOVED***
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			***REMOVED*** else ***REMOVED***
				$(element).addClass(errorClass).removeClass(validClass);
			***REMOVED***
		***REMOVED***,
		unhighlight: function( element, errorClass, validClass ) ***REMOVED***
			if ( element.type === "radio" ) ***REMOVED***
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			***REMOVED*** else ***REMOVED***
				$(element).removeClass(errorClass).addClass(validClass);
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function( settings ) ***REMOVED***
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
			$.each(this.settings.groups, function( key, value ) ***REMOVED***
				if ( typeof value === "string" ) ***REMOVED***
					value = value.split(/\s/);
				***REMOVED***
				$.each(value, function( index, name ) ***REMOVED***
					groups[name] = key;
				***REMOVED***);
			***REMOVED***);
			var rules = this.settings.rules;
			$.each(rules, function( key, value ) ***REMOVED***
				rules[key] = $.validator.normalizeRule(value);
			***REMOVED***);

			function delegate(event) ***REMOVED***
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				if ( validator.settings[eventType] ) ***REMOVED***
					validator.settings[eventType].call(validator, this[0], event);
				***REMOVED***
			***REMOVED***
			$(this.currentForm)
				.validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'] ",
					"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if ( this.settings.invalidHandler ) ***REMOVED***
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
			***REMOVED***
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() ***REMOVED***
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend(***REMOVED******REMOVED***, this.errorMap);
			if ( !this.valid() ) ***REMOVED***
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			***REMOVED***
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
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element ) !== false;
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
		showErrors: function( errors ) ***REMOVED***
			if ( errors ) ***REMOVED***
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
				this.successList = $.grep( this.successList, function( element ) ***REMOVED***
					return !(element.name in errors);
				***REMOVED***);
			***REMOVED***
			if ( this.settings.showErrors ) ***REMOVED***
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			***REMOVED*** else ***REMOVED***
				this.defaultShowErrors();
			***REMOVED***
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() ***REMOVED***
			if ( $.fn.resetForm ) ***REMOVED***
				$(this.currentForm).resetForm();
			***REMOVED***
			this.submitted = ***REMOVED******REMOVED***;
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
		***REMOVED***,

		numberOfInvalids: function() ***REMOVED***
			return this.objectLength(this.invalid);
		***REMOVED***,

		objectLength: function( obj ) ***REMOVED***
			var count = 0;
			for ( var i in obj ) ***REMOVED***
				count++;
			***REMOVED***
			return count;
		***REMOVED***,

		hideErrors: function() ***REMOVED***
			this.addWrapper( this.toHide ).hide();
		***REMOVED***,

		valid: function() ***REMOVED***
			return this.size() === 0;
		***REMOVED***,

		size: function() ***REMOVED***
			return this.errorList.length;
		***REMOVED***,

		focusInvalid: function() ***REMOVED***
			if ( this.settings.focusInvalid ) ***REMOVED***
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
			return lastActive && $.grep(this.errorList, function( n ) ***REMOVED***
				return n.element.name === lastActive.name;
			***REMOVED***).length === 1 && lastActive;
		***REMOVED***,

		elements: function() ***REMOVED***
			var validator = this,
				rulesCache = ***REMOVED******REMOVED***;

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() ***REMOVED***
				if ( !this.name && validator.settings.debug && window.console ) ***REMOVED***
					console.error( "%o has no name assigned", this);
				***REMOVED***

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) ***REMOVED***
					return false;
				***REMOVED***

				rulesCache[this.name] = true;
				return true;
			***REMOVED***);
		***REMOVED***,

		clean: function( selector ) ***REMOVED***
			return $(selector)[0];
		***REMOVED***,

		errors: function() ***REMOVED***
			var errorClass = this.settings.errorClass.replace(" ", ".");
			return $(this.settings.errorElement + "." + errorClass, this.errorContext);
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

		elementValue: function( element ) ***REMOVED***
			var type = $(element).attr("type"),
				val = $(element).val();

			if ( type === "radio" || type === "checkbox" ) ***REMOVED***
				return $("input[name='" + $(element).attr("name") + "']:checked").val();
			***REMOVED***

			if ( typeof val === "string" ) ***REMOVED***
				return val.replace(/\r/g, "");
			***REMOVED***
			return val;
		***REMOVED***,

		check: function( element ) ***REMOVED***
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			var val = this.elementValue(element);
			var result;

			for (var method in rules ) ***REMOVED***
				var rule = ***REMOVED*** method: method, parameters: rules[method] ***REMOVED***;
				try ***REMOVED***

					result = $.validator.methods[method].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" ) ***REMOVED***
						dependencyMismatch = true;
						continue;
					***REMOVED***
					dependencyMismatch = false;

					if ( result === "pending" ) ***REMOVED***
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					***REMOVED***

					if ( !result ) ***REMOVED***
						this.formatAndAdd( element, rule );
						return false;
					***REMOVED***
				***REMOVED*** catch(e) ***REMOVED***
					if ( this.settings.debug && window.console ) ***REMOVED***
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					***REMOVED***
					throw e;
				***REMOVED***
			***REMOVED***
			if ( dependencyMismatch ) ***REMOVED***
				return;
			***REMOVED***
			if ( this.objectLength(rules) ) ***REMOVED***
				this.successList.push(element);
			***REMOVED***
			return true;
		***REMOVED***,

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		customDataMessage: function( element, method ) ***REMOVED***
			return $(element).data("msg-" + method.toLowerCase()) || (element.attributes && $(element).attr("data-msg-" + method.toLowerCase()));
		***REMOVED***,

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) ***REMOVED***
			var m = this.settings.messages[name];
			return m && (m.constructor === String ? m : m[method]);
		***REMOVED***,

		// return the first defined argument, allowing empty strings
		findDefined: function() ***REMOVED***
			for(var i = 0; i < arguments.length; i++) ***REMOVED***
				if ( arguments[i] !== undefined ) ***REMOVED***
					return arguments[i];
				***REMOVED***
			***REMOVED***
			return undefined;
		***REMOVED***,

		defaultMessage: function( element, method ) ***REMOVED***
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		***REMOVED***,

		formatAndAdd: function( element, rule ) ***REMOVED***
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\***REMOVED***(\d+)\***REMOVED***/g;
			if ( typeof message === "function" ) ***REMOVED***
				message = message.call(this, rule.parameters, element);
			***REMOVED*** else if (theregex.test(message)) ***REMOVED***
				message = $.validator.format(message.replace(theregex, "***REMOVED***$1***REMOVED***"), rule.parameters);
			***REMOVED***
			this.errorList.push(***REMOVED***
				message: message,
				element: element
			***REMOVED***);

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		***REMOVED***,

		addWrapper: function( toToggle ) ***REMOVED***
			if ( this.settings.wrapper ) ***REMOVED***
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			***REMOVED***
			return toToggle;
		***REMOVED***,

		defaultShowErrors: function() ***REMOVED***
			var i, elements;
			for ( i = 0; this.errorList[i]; i++ ) ***REMOVED***
				var error = this.errorList[i];
				if ( this.settings.highlight ) ***REMOVED***
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				***REMOVED***
				this.showLabel( error.element, error.message );
			***REMOVED***
			if ( this.errorList.length ) ***REMOVED***
				this.toShow = this.toShow.add( this.containers );
			***REMOVED***
			if ( this.settings.success ) ***REMOVED***
				for ( i = 0; this.successList[i]; i++ ) ***REMOVED***
					this.showLabel( this.successList[i] );
				***REMOVED***
			***REMOVED***
			if ( this.settings.unhighlight ) ***REMOVED***
				for ( i = 0, elements = this.validElements(); elements[i]; i++ ) ***REMOVED***
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

		showLabel: function( element, message ) ***REMOVED***
			var label = this.errorsFor( element );
			if ( label.length ) ***REMOVED***
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
				// replace message on existing label
				label.html(message);
			***REMOVED*** else ***REMOVED***
				// create label
				label = $("<" + this.settings.errorElement + ">")
					.attr("for", this.idOrName(element))
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) ***REMOVED***
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				***REMOVED***
				if ( !this.labelContainer.append(label).length ) ***REMOVED***
					if ( this.settings.errorPlacement ) ***REMOVED***
						this.settings.errorPlacement(label, $(element) );
					***REMOVED*** else ***REMOVED***
						label.insertAfter(element);
					***REMOVED***
				***REMOVED***
			***REMOVED***
			if ( !message && this.settings.success ) ***REMOVED***
				label.text("");
				if ( typeof this.settings.success === "string" ) ***REMOVED***
					label.addClass( this.settings.success );
				***REMOVED*** else ***REMOVED***
					this.settings.success( label, element );
				***REMOVED***
			***REMOVED***
			this.toShow = this.toShow.add(label);
		***REMOVED***,

		errorsFor: function( element ) ***REMOVED***
			var name = this.idOrName(element);
			return this.errors().filter(function() ***REMOVED***
				return $(this).attr("for") === name;
			***REMOVED***);
		***REMOVED***,

		idOrName: function( element ) ***REMOVED***
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		***REMOVED***,

		validationTargetFor: function( element ) ***REMOVED***
			// if radio/checkbox, validate first element in group instead
			if ( this.checkable(element) ) ***REMOVED***
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			***REMOVED***
			return element;
		***REMOVED***,

		checkable: function( element ) ***REMOVED***
			return (/radio|checkbox/i).test(element.type);
		***REMOVED***,

		findByName: function( name ) ***REMOVED***
			return $(this.currentForm).find("[name='" + name + "']");
		***REMOVED***,

		getLength: function( value, element ) ***REMOVED***
			switch( element.nodeName.toLowerCase() ) ***REMOVED***
			case "select":
				return $("option:selected", element).length;
			case "input":
				if ( this.checkable( element) ) ***REMOVED***
					return this.findByName(element.name).filter(":checked").length;
				***REMOVED***
			***REMOVED***
			return value.length;
		***REMOVED***,

		depend: function( param, element ) ***REMOVED***
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
		***REMOVED***,

		dependTypes: ***REMOVED***
			"boolean": function( param, element ) ***REMOVED***
				return param;
			***REMOVED***,
			"string": function( param, element ) ***REMOVED***
				return !!$(param, element.form).length;
			***REMOVED***,
			"function": function( param, element ) ***REMOVED***
				return param(element);
			***REMOVED***
		***REMOVED***,

		optional: function( element ) ***REMOVED***
			var val = this.elementValue(element);
			return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
		***REMOVED***,

		startRequest: function( element ) ***REMOVED***
			if ( !this.pending[element.name] ) ***REMOVED***
				this.pendingRequest++;
				this.pending[element.name] = true;
			***REMOVED***
		***REMOVED***,

		stopRequest: function( element, valid ) ***REMOVED***
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) ***REMOVED***
				this.pendingRequest = 0;
			***REMOVED***
			delete this.pending[element.name];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) ***REMOVED***
				$(this.currentForm).submit();
				this.formSubmitted = false;
			***REMOVED*** else if (!valid && this.pendingRequest === 0 && this.formSubmitted) ***REMOVED***
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			***REMOVED***
		***REMOVED***,

		previousValue: function( element ) ***REMOVED***
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
		number: ***REMOVED***number: true***REMOVED***,
		digits: ***REMOVED***digits: true***REMOVED***,
		creditcard: ***REMOVED***creditcard: true***REMOVED***
	***REMOVED***,

	addClassRules: function( className, rules ) ***REMOVED***
		if ( className.constructor === String ) ***REMOVED***
			this.classRuleSettings[className] = rules;
		***REMOVED*** else ***REMOVED***
			$.extend(this.classRuleSettings, className);
		***REMOVED***
	***REMOVED***,

	classRules: function( element ) ***REMOVED***
		var rules = ***REMOVED******REMOVED***;
		var classes = $(element).attr("class");
		if ( classes ) ***REMOVED***
			$.each(classes.split(" "), function() ***REMOVED***
				if ( this in $.validator.classRuleSettings ) ***REMOVED***
					$.extend(rules, $.validator.classRuleSettings[this]);
				***REMOVED***
			***REMOVED***);
		***REMOVED***
		return rules;
	***REMOVED***,

	attributeRules: function( element ) ***REMOVED***
		var rules = ***REMOVED******REMOVED***;
		var $element = $(element);
		var type = $element[0].getAttribute("type");

		for (var method in $.validator.methods) ***REMOVED***
			var value;

			// support for <input required> in both html5 and older browsers
			if ( method === "required" ) ***REMOVED***
				value = $element.get(0).getAttribute(method);
				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) ***REMOVED***
					value = true;
				***REMOVED***
				// force non-HTML5 browsers to return bool
				value = !!value;
			***REMOVED*** else ***REMOVED***
				value = $element.attr(method);
			***REMOVED***

			// convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) ***REMOVED***
				value = Number(value);
			***REMOVED***

			if ( value ) ***REMOVED***
				rules[method] = value;
			***REMOVED*** else if ( type === method && type !== 'range' ) ***REMOVED***
				// exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[method] = true;
			***REMOVED***
		***REMOVED***

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) ) ***REMOVED***
			delete rules.maxlength;
		***REMOVED***

		return rules;
	***REMOVED***,

	dataRules: function( element ) ***REMOVED***
		var method, value,
			rules = ***REMOVED******REMOVED***, $element = $(element);
		for (method in $.validator.methods) ***REMOVED***
			value = $element.data("rule-" + method.toLowerCase());
			if ( value !== undefined ) ***REMOVED***
				rules[method] = value;
			***REMOVED***
		***REMOVED***
		return rules;
	***REMOVED***,

	staticRules: function( element ) ***REMOVED***
		var rules = ***REMOVED******REMOVED***;
		var validator = $.data(element.form, "validator");
		if ( validator.settings.rules ) ***REMOVED***
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || ***REMOVED******REMOVED***;
		***REMOVED***
		return rules;
	***REMOVED***,

	normalizeRules: function( rules, element ) ***REMOVED***
		// handle dependency check
		$.each(rules, function( prop, val ) ***REMOVED***
			// ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) ***REMOVED***
				delete rules[prop];
				return;
			***REMOVED***
			if ( val.param || val.depends ) ***REMOVED***
				var keepRule = true;
				switch (typeof val.depends) ***REMOVED***
				case "string":
					keepRule = !!$(val.depends, element.form).length;
					break;
				case "function":
					keepRule = val.depends.call(element, element);
					break;
				***REMOVED***
				if ( keepRule ) ***REMOVED***
					rules[prop] = val.param !== undefined ? val.param : true;
				***REMOVED*** else ***REMOVED***
					delete rules[prop];
				***REMOVED***
			***REMOVED***
		***REMOVED***);

		// evaluate parameters
		$.each(rules, function( rule, parameter ) ***REMOVED***
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		***REMOVED***);

		// clean number parameters
		$.each(['minlength', 'maxlength'], function() ***REMOVED***
			if ( rules[this] ) ***REMOVED***
				rules[this] = Number(rules[this]);
			***REMOVED***
		***REMOVED***);
		$.each(['rangelength', 'range'], function() ***REMOVED***
			var parts;
			if ( rules[this] ) ***REMOVED***
				if ( $.isArray(rules[this]) ) ***REMOVED***
					rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
				***REMOVED*** else if ( typeof rules[this] === "string" ) ***REMOVED***
					parts = rules[this].split(/[\s,]+/);
					rules[this] = [Number(parts[0]), Number(parts[1])];
				***REMOVED***
			***REMOVED***
		***REMOVED***);

		if ( $.validator.autoCreateRanges ) ***REMOVED***
			// auto-create ranges
			if ( rules.min && rules.max ) ***REMOVED***
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			***REMOVED***
			if ( rules.minlength && rules.maxlength ) ***REMOVED***
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			***REMOVED***
		***REMOVED***

		return rules;
	***REMOVED***,

	// Converts a simple string to a ***REMOVED***string: true***REMOVED*** rule, e.g., "required" to ***REMOVED***required:true***REMOVED***
	normalizeRule: function( data ) ***REMOVED***
		if ( typeof data === "string" ) ***REMOVED***
			var transformed = ***REMOVED******REMOVED***;
			$.each(data.split(/\s/), function() ***REMOVED***
				transformed[this] = true;
			***REMOVED***);
			data = transformed;
		***REMOVED***
		return data;
	***REMOVED***,

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function( name, method, message ) ***REMOVED***
		$.validator.methods[name] = method;
		$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
		if ( method.length < 3 ) ***REMOVED***
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		***REMOVED***
	***REMOVED***,

	methods: ***REMOVED***

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function( value, element, param ) ***REMOVED***
			// check if dependency is met
			if ( !this.depend(param, element) ) ***REMOVED***
				return "dependency-mismatch";
			***REMOVED***
			if ( element.nodeName.toLowerCase() === "select" ) ***REMOVED***
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			***REMOVED***
			if ( this.checkable(element) ) ***REMOVED***
				return this.getLength(value, element) > 0;
			***REMOVED***
			return $.trim(value).length > 0;
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function( value, element ) ***REMOVED***
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`***REMOVED***\|***REMOVED***~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`***REMOVED***\|***REMOVED***~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function( value, element ) ***REMOVED***
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]***REMOVED***2***REMOVED***)|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function( value, element ) ***REMOVED***
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function( value, element ) ***REMOVED***
			return this.optional(element) || /^\d***REMOVED***4***REMOVED***[\/\-]\d***REMOVED***1,2***REMOVED***[\/\-]\d***REMOVED***1,2***REMOVED***$/.test(value);
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function( value, element ) ***REMOVED***
			return this.optional(element) || /^-?(?:\d+|\d***REMOVED***1,3***REMOVED***(?:,\d***REMOVED***3***REMOVED***)+)?(?:\.\d+)?$/.test(value);
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function( value, element ) ***REMOVED***
			return this.optional(element) || /^\d+$/.test(value);
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function( value, element ) ***REMOVED***
			if ( this.optional(element) ) ***REMOVED***
				return "dependency-mismatch";
			***REMOVED***
			// accept only spaces, digits and dashes
			if ( /[^0-9 \-]+/.test(value) ) ***REMOVED***
				return false;
			***REMOVED***
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) ***REMOVED***
				var cDigit = value.charAt(n);
				nDigit = parseInt(cDigit, 10);
				if ( bEven ) ***REMOVED***
					if ( (nDigit *= 2) > 9 ) ***REMOVED***
						nDigit -= 9;
					***REMOVED***
				***REMOVED***
				nCheck += nDigit;
				bEven = !bEven;
			***REMOVED***

			return (nCheck % 10) === 0;
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function( value, element, param ) ***REMOVED***
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length >= param;
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function( value, element, param ) ***REMOVED***
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length <= param;
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function( value, element, param ) ***REMOVED***
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
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

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function( value, element, param ) ***REMOVED***
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param);
			if ( this.settings.onfocusout ) ***REMOVED***
				target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() ***REMOVED***
					$(element).valid();
				***REMOVED***);
			***REMOVED***
			return value === target.val();
		***REMOVED***,

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function( value, element, param ) ***REMOVED***
			if ( this.optional(element) ) ***REMOVED***
				return "dependency-mismatch";
			***REMOVED***

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] ) ***REMOVED***
				this.settings.messages[element.name] = ***REMOVED******REMOVED***;
			***REMOVED***
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param === "string" && ***REMOVED***url:param***REMOVED*** || param;

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
				success: function( response ) ***REMOVED***
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true || response === "true";
					if ( valid ) ***REMOVED***
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						delete validator.invalid[element.name];
						validator.showErrors();
					***REMOVED*** else ***REMOVED***
						var errors = ***REMOVED******REMOVED***;
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.invalid[element.name] = true;
						validator.showErrors(errors);
					***REMOVED***
					previous.valid = valid;
					validator.stopRequest(element, valid);
				***REMOVED***
			***REMOVED***, param));
			return "pending";
		***REMOVED***

	***REMOVED***

***REMOVED***);

// deprecated, use $.validator.format instead
$.format = $.validator.format;

***REMOVED***(jQuery));

// ajax mode: abort
// usage: $.ajax(***REMOVED*** mode: "abort"[, port: "uniqueport"]***REMOVED***);
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) ***REMOVED***
	var pendingRequests = ***REMOVED******REMOVED***;
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) ***REMOVED***
		$.ajaxPrefilter(function( settings, _, xhr ) ***REMOVED***
			var port = settings.port;
			if ( settings.mode === "abort" ) ***REMOVED***
				if ( pendingRequests[port] ) ***REMOVED***
					pendingRequests[port].abort();
				***REMOVED***
				pendingRequests[port] = xhr;
			***REMOVED***
		***REMOVED***);
	***REMOVED*** else ***REMOVED***
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function( settings ) ***REMOVED***
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if ( mode === "abort" ) ***REMOVED***
				if ( pendingRequests[port] ) ***REMOVED***
					pendingRequests[port].abort();
				***REMOVED***
				pendingRequests[port] = ajax.apply(this, arguments);
				return pendingRequests[port];
			***REMOVED***
			return ajax.apply(this, arguments);
		***REMOVED***;
	***REMOVED***
***REMOVED***(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) ***REMOVED***
	$.extend($.fn, ***REMOVED***
		validateDelegate: function( delegate, type, handler ) ***REMOVED***
			return this.bind(type, function( event ) ***REMOVED***
				var target = $(event.target);
				if ( target.is(delegate) ) ***REMOVED***
					return handler.apply(target, arguments);
				***REMOVED***
			***REMOVED***);
		***REMOVED***
	***REMOVED***);
***REMOVED***(jQuery));
