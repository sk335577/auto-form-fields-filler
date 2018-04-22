"use strict";

var values = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    textarea: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id enim at lacus maximus imperdiet semper in enim. Vestibulum varius bibendum condimentum. Morbi eget aliquam libero. Sed nec risus bibendum, facilisis ligula a, dignissim massa. Etiam ante justo, volutpat vitae euismod eget, viverra vitae dui. Praesent condimentum ultricies ligula at varius. Etiam nulla nisl, commodo a mi a, convallis porttitor enim. ',
    number: 99,
    email: 'email@somewhere.com'
};

browser.runtime.onMessage.addListener(request => {

    for (var i = 0; i < window.document.forms.length; i++) {
        for (var j = 0; j < window.document.forms[i].elements.length; j++) {
            if (window.document.forms[i].elements[j].type != 'hidden' && window.document.forms[i].elements[j].type != 'button' && window.document.forms[i].elements[j].type != 'submit') {
                var tagName = (window.document.forms[i].elements[j].tagName).toLowerCase();
                switch (tagName) {
                    case 'input':
                    case 'textarea':
                        if (values[window.document.forms[i].elements[j].type]) {

                            window.document.forms[i].elements[j].value = values[window.document.forms[i].elements[j].type];

                            if ("createEvent" in document) {
                                var evt = document.createEvent("HTMLEvents");
                                evt.initEvent("change", false, true);
                                window.document.forms[i].elements[j].dispatchEvent(evt);
                            } else {
                                window.document.forms[i].elements[j].fireEvent("onchange");
                            }
                        }
                        break;
                }
            }
        }

    }

    return Promise.resolve({});
});