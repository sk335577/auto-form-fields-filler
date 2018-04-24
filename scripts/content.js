"use strict";

var values = {
    text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    textarea: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id enim at lacus maximus imperdiet semper in enim. Vestibulum varius bibendum condimentum. Morbi eget aliquam libero. Sed nec risus bibendum, facilisis ligula a, dignissim massa. Etiam ante justo, volutpat vitae euismod eget, viverra vitae dui. Praesent condimentum ultricies ligula at varius. Etiam nulla nisl, commodo a mi a, convallis porttitor enim. ',
    number: 99,
    email: 'email@somewhere.com',
    name: 'Sandeep Kumar'
};

browser.runtime.onMessage.addListener(request => {

    for (var i = 0; i < window.document.forms.length; i++) {
        for (var j = 0; j < window.document.forms[i].elements.length; j++) {
            if (window.document.forms[i].elements[j].type != 'hidden' && window.document.forms[i].elements[j].type != 'button' && window.document.forms[i].elements[j].type != 'submit') {
                var tagName = (window.document.forms[i].elements[j].tagName).toLowerCase();
                var somethingUpdated = false;
                switch (tagName) {
                    case 'input':
                        switch (window.document.forms[i].elements[j].type) {
                            case 'text':
                            case 'email':
                            case 'number':
                                if ((/email/).test(window.document.forms[i].elements[j].name)) {
                                    window.document.forms[i].elements[j].value = values['email'];
                                } else {
                                    if ((/name/).test(window.document.forms[i].elements[j].name)) {
                                        window.document.forms[i].elements[j].value = values['name'];
                                    } else {
                                        window.document.forms[i].elements[j].value = values[window.document.forms[i].elements[j].type];
                                    }
                                }
                                somethingUpdated = true;
                                break;
                            case 'radio':
                            case 'checkbox':
                                window.document.forms[i].elements[j].checked = true;
                                somethingUpdated = true;
                                break;
                        }

                        break;
                    case 'select':
                        window.document.forms[i].elements[j].lastElementChild.selected = true;
                        somethingUpdated = true;
                        break;
                    case 'textarea':
                        window.document.forms[i].elements[j].value = values[window.document.forms[i].elements[j].type];
                        somethingUpdated = true;
                        break;
                }
                if (somethingUpdated) {
                    if ("createEvent" in document) {
                        //change
                        var htmlEvent = document.createEvent("HTMLEvents");
                        htmlEvent.initEvent("change", false, true);
                        window.document.forms[i].elements[j].dispatchEvent(htmlEvent);

                        var keyboardEvent = document.createEvent("KeyboardEvent");
                        var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
                        keyboardEvent[initMethod](
                                "keyup", // event type : keydown, keyup, keypress
                                true, // bubbles
                                true, // cancelable
                                window, // viewArg: should be window
                                false, // ctrlKeyArg
                                false, // altKeyArg
                                false, // shiftKeyArg
                                false, // metaKeyArg
                                40, // keyCodeArg : unsigned long the virtual key code, else 0
                                0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
                                );
                        window.document.forms[i].elements[j].dispatchEvent(keyboardEvent);
                    } else {
                        window.document.forms[i].elements[j].fireEvent("onchange");
                    }
                }
            }
        }

    }

    return Promise.resolve({});
});