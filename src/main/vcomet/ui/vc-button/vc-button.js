
// vcomet.define({

//     properties: {
//         /*
//           @property {String} value 
//           @description Button text
//         */
//         value: {
//             value: "",
//             reflect: true
//         },
//         /*
//           @property {Boolean} disable 
//           @description Button desactivation
//           Values can be: true o false
//           Default: false
//         */
//         disable: {
//             value: false,
//             reflect: true
//         },
//         /*
//           @property {String} type 
//           @description Only indicate for submit buttons
//           Values can be: submit or valueless
//           Default: valueless
//         */
//         type: {
//             value: "",
//             reflect: true
//         },
//         /*
//          @property {String} expand 
//          @description Space that occupy inside parent container
//          Values can be: full or inline
//          Default: inline
//        */
//         expand: {
//             value: "inline",
//             reflect: true
//         },
//         /*
//           @property {String} icon 
//           @description Button icon
//         */
//         icon: {
//             value: "",
//             reflect: true
//         },
//         /*
//           @property {String} iconPosition 
//           @description Button icon position with respect text
//           Values can be: left or right
//           Default: left
//         */
//         iconPosition: {
//             value: "left",
//             reflect: true
//         }
//     },

//     functions: {
//         /*
//           @function setOnClick
//           @description Set onclick attribute
//           @param {String} functionality [Button onclick functionality]
//         */
//         setOnClick: function (functionality) {

//             this.setAttribute("onclick", functionality);
//         },

//         /*
//           @function setValue
//           @description Set new button text
//           @param {String} newVal [New button text]
//         */
//         setValue: function (newVal) {
//             var el = this;
//             var button = el.querySelector(".vc-button-button");
//             var buttonText = document.createElement("div");

//             if (newVal) {
//                 // First time the button text is added
//                 if (!el.hasAttribute("text")) {

//                     buttonText.innerHTML = newVal;
//                     button.appendChild(buttonText);
//                     buttonText.classList.add("vc-button-buttonText");

//                     // When the button text is dynamically changed
//                 } else {

//                     var oldText = button.querySelector(".vc-button-buttonText");
//                     buttonText.innerHTML = newVal;
//                     var newText = buttonText;
//                     newText.classList.add("vc-button-buttonText");
//                     button.replaceChild(newText, oldText);
//                 }

//             }

//             // When the button has no text is added an attribute
//             // so if the button has icon it will be placed centered
//             (!newVal) ? el.setAttribute("text", "false") : el.setAttribute("text", "true");

//         }
//     },

//     privateFunctions: {
//         /*
//           @function (private) _setupIcon
//           @description Set new button icon
//           @param {String} newVal [New button icon]
//         */
//         setupIcon: function (newVal) {

//             if (newVal) {
//                 var el = this;
//                 var button = el.querySelector(".vc-button-button");
//                 var iconAttribute = newVal;
//                 var icon;

//                 // When change the icon dynamically is necessary delete old icon
//                 if (button.classList.contains("vc-button-addedIcon")) {
//                     var oldIcon = el.querySelector(".vc-button-buttonIcon");

//                     button.removeChild(oldIcon);
//                 }

//                 if (iconAttribute.indexOf("</i>") !== -1) {
//                     var tempDiv = document.createElement("div");

//                     tempDiv.innerHTML = iconAttribute;
//                     icon = tempDiv.querySelector("i");
//                     icon.classList.add("vc-button-buttonIcon");

//                 } else {

//                     icon = document.createElement("div");
//                     icon.style.backgroundImage = "url('" + iconAttribute + "')";
//                     icon.classList.add("vc-button-buttonIcon");

//                 }

//                 button.appendChild(icon);
//                 button.classList.add("vc-button-addedIcon");
//             }
//         },

//         /*
//           @function (private) _updateDisable
//           @description Update disable status
//           @param {String} newVal [New value of disabled]
//         */
//         updateDisable: function (newVal) {
//             var button = this.querySelector(".vc-button-button");

//             if (!vcomet.util.isTrue(newVal)) {
//                 button.removeAttribute("disabled");
//                 button.classList.remove("vc-button-disableButton");
//                 this.style.pointerEvents = "auto";

//             } else {

//                 button.setAttribute("disabled", "true");
//                 button.classList.add("vc-button-disableButton");
//                 this.style.pointerEvents = "none";

//             }
//         }
//     },

//     onRender: function () {
//         var el = this;
//         var button = el.querySelector(".vc-button-button");

//         el.setValue(el.value);
//         el._updateDisable(el.disable);
//         el._setupIcon(el.icon);
//         // When the button is a type form submit
//         (el.type) ? button.setAttribute("type", el.type) : null;

//     },

//     onPropertyChanged: function (attrName, oldVal, newVal) {
//         switch (attrName) {
//             case "disable":
//                 this._updateDisable(newVal);
//                 break;
//             case "icon":
//                 (newVal !== "") ? this._setupIcon(newVal) : null;
//                 break;
//         }
//     }


// });

////////////////////////////////////

vcomet.element("vc-button", "style.css", {

    properties: {
        /*
          @property {String} value 
          @description Button text
        */
        value: {
            value: "",
            reflect: true
        },
        /*
          @property {Boolean} disable 
          @description Button desactivation
          Values can be: true o false
          Default: false
        */
        disable: {
            value: false,
            reflect: true
        },
        /*
          @property {String} type 
          @description Only indicate for submit buttons
          Values can be: submit or valueless
          Default: valueless
        */
        type: {
            value: "",
            reflect: true
        },
        /*
         @property {String} expand 
         @description Space that occupy inside parent container
         Values can be: full or inline
         Default: inline
       */
        expand: {
            value: "inline",
            reflect: true
        },
        /*
          @property {String} icon 
          @description Button icon
        */
        icon: {
            value: "",
            reflect: true
        },
        /*
          @property {String} iconPosition 
          @description Button icon position with respect text
          Values can be: left or right
          Default: left
        */
        iconPosition: {
            value: "left",
            reflect: true
        }
    },

    functions: {
        /*
          @function setOnClick
          @description Set onclick attribute
          @param {String} functionality [Button onclick functionality]
        */
        setOnClick: function (functionality) {

            this.setAttribute("onclick", functionality);
        },

        /*
          @function setValue
          @description Set new button text
          @param {String} newVal [New button text]
        */
        setValue: function (newVal) {
            var el = this;
            var button = el.querySelector(".vc-button-button");
            var buttonText = document.createElement("div");

            if (newVal) {
                // First time the button text is added
                if (!el.hasAttribute("text")) {

                    buttonText.innerHTML = newVal;
                    button.appendChild(buttonText);
                    buttonText.classList.add("vc-button-buttonText");

                    // When the button text is dynamically changed
                } else {

                    var oldText = button.querySelector(".vc-button-buttonText");
                    buttonText.innerHTML = newVal;
                    var newText = buttonText;
                    newText.classList.add("vc-button-buttonText");
                    button.replaceChild(newText, oldText);
                }

            }

            // When the button has no text is added an attribute
            // so if the button has icon it will be placed centered
            (!newVal) ? el.setAttribute("text", "false") : el.setAttribute("text", "true");

        }
    },

    privateFunctions: {
        /*
          @function (private) _setupIcon
          @description Set new button icon
          @param {String} newVal [New button icon]
        */
        setupIcon: function (newVal) {

            if (newVal) {
                var el = this;
                var button = el.querySelector(".vc-button-button");
                var iconAttribute = newVal;
                var icon;

                // When change the icon dynamically is necessary delete old icon
                if (button.classList.contains("vc-button-addedIcon")) {
                    var oldIcon = el.querySelector(".vc-button-buttonIcon");

                    button.removeChild(oldIcon);
                }

                if (iconAttribute.indexOf("</i>") !== -1) {
                    var tempDiv = document.createElement("div");

                    tempDiv.innerHTML = iconAttribute;
                    icon = tempDiv.querySelector("i");
                    icon.classList.add("vc-button-buttonIcon");

                } else {

                    icon = document.createElement("div");
                    icon.style.backgroundImage = "url('" + iconAttribute + "')";
                    icon.classList.add("vc-button-buttonIcon");

                }

                button.appendChild(icon);
                button.classList.add("vc-button-addedIcon");
            }
        },

        /*
          @function (private) _updateDisable
          @description Update disable status
          @param {String} newVal [New value of disabled]
        */
        updateDisable: function (newVal) {
            var button = this.querySelector(".vc-button-button");

            if (!vcomet.util.isTrue(newVal)) {
                button.removeAttribute("disabled");
                button.classList.remove("vc-button-disableButton");
                this.style.pointerEvents = "auto";

            } else {

                button.setAttribute("disabled", "true");
                button.classList.add("vc-button-disableButton");
                this.style.pointerEvents = "none";

            }
        }
    },

    onRender: function () {
        var el = this;
        var button = el.querySelector(".vc-button-button");

        el.setValue(el.value);
        el._updateDisable(el.disable);
        el._setupIcon(el.icon);
        // When the button is a type form submit
        (el.type) ? button.setAttribute("type", el.type) : null;

    },

    onPropertyChanged: function (attrName, oldVal, newVal) {
        switch (attrName) {
            case "disable":
                this._updateDisable(newVal);
                break;
            case "icon":
                (newVal !== "") ? this._setupIcon(newVal) : null;
                break;
        }
    }


});

