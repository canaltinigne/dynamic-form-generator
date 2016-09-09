/* **************************
    CREATED BY CAN ALTINİĞNE
    ARGELA SUMMER INTERNSHIP
             08/16
   ************************* */
System.register(['@angular/core', '@angular/platform-browser-dynamic'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_dynamic_1;
    var MyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            }],
        execute: function() {
            MyComponent = (function () {
                function MyComponent(changeDetector) {
                    this.changeDetector = changeDetector;
                    this.language = 'en';
                    this.minimumLength = "";
                    this.field_counter = 1;
                    this.newAddedField = "mynewfield";
                    this.addedOptions = [];
                    this.option_counter = 1;
                    this.situation = true;
                    this.app_messages = {
                        minlength_errors: {
                            'en': 'Add more characters.',
                            'tr': 'Daha fazla karakter ekleyin.'
                        },
                        match_errors: {
                            'en': 'Whoops! These don\'t match.',
                            'tr': 'Hoppa! Şifreler uyuşmadı.'
                        },
                        email_errors: {
                            'en': 'Please enter a valid email address.',
                            'tr': 'Geçerli bir email adresi girin.'
                        },
                        password_error: {
                            'en': 'Please fill out this field.',
                            'tr': 'Lütfen bu alanı doldurunuz.'
                        },
                        radio_error: {
                            'en': 'Please select one of the alternatives above.',
                            'tr': 'Lütfen bu seçeneklerden birini belirleyin.'
                        },
                        showform_message: {
                            'en': 'Show my form',
                            'tr': 'Formu göster'
                        },
                        select_type: {
                            'en': 'Select type',
                            'tr': 'Alanı seç'
                        },
                        field_label: {
                            'en': 'Label for field',
                            'tr': 'Alan için isim'
                        },
                        new_option: {
                            'en': 'Add new option',
                            'tr': 'Yeni opsiyon ekle'
                        },
                        checkbox_message: {
                            'en': 'For checkboxes, radio buttons and dropdown lists.',
                            'tr': 'Checkbox, radio butonları ve dropdown listeler için.'
                        },
                        required_message: {
                            'en': 'Required',
                            'tr': 'Zorunlu'
                        },
                        addfield_message: {
                            'en': 'Add field',
                            'tr': 'Alan ekle'
                        },
                        jsonfile_message: {
                            'en': 'JSON File',
                            'tr': 'JSON Dosyası'
                        },
                        newfieldbutton_message: {
                            'en': 'Add new fields',
                            'tr': 'Yeni alan ekle'
                        },
                        submit_message: {
                            'en': 'Submit',
                            'tr': 'Gönder'
                        }
                    };
                    this.getJSONFile();
                }
                // LOCAL JSON DOSYASININ OKUNMASI
                MyComponent.prototype.getJSONFile = function () {
                    var request = new XMLHttpRequest();
                    var self = this;
                    request.onload = function () {
                        self.data = JSON.parse(this.responseText);
                        self.form_name = self.data[0];
                        self.changeDetector.detectChanges(); // SAYFA TAMAMEN DOLMADAN JQUERY ÇALIŞTIRMA
                        $.each(self.data, function (key, value) {
                            if (value == "en" || value == "tr") {
                                self.language = value;
                            }
                            if (value.required == "true") {
                                $("#" + value.id).attr("required", "required");
                            }
                            if (value.type == "password") {
                                // EĞER EKLENEN PASSWORD İSE CONFIRM EDİLDİĞİ ALANA DA REQUIRED ÖZELLİĞİ EKLE VE DATA MATCH İÇİN
                                // ATTRIBUTE EKLE
                                $("#" + value.confirmID).attr("required", "required");
                                $("#" + value.confirmID).attr("data-match", "#" + value.id);
                                if (value.required = "true") {
                                    if (self.language == "en") {
                                        $("#" + value.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['en'] + "\')");
                                        $("#" + value.confirmID).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['en'] + "\')");
                                    }
                                    else {
                                        $("#" + value.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['tr'] + "\')");
                                        $("#" + value.confirmID).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['tr'] + "\')");
                                    }
                                    $("#" + value.id).attr("oninput", "this.setCustomValidity(\'\')");
                                    $("#" + value.confirmID).attr("oninput", "this.setCustomValidity(\'\')");
                                }
                            }
                            if (value.type == "checkbox" || value.type == "radio") {
                                if (value.required == "true") {
                                    $.each(value.options, function (index, obj) {
                                        $("#" + obj.id).attr("required", "required");
                                        if (value.type == "radio") {
                                            if (self.language == "en") {
                                                $("#" + obj.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.radio_error['en'] + "\')");
                                            }
                                            else {
                                                $("#" + obj.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.radio_error['tr'] + "\')");
                                            }
                                            $("#" + obj.id).attr("onclick", "this.setCustomValidity(\'\')");
                                        }
                                    });
                                }
                            }
                        });
                        $("#myForm").validator(); // BOOTSTRAP VALIDATOR ÇALIŞTIR
                    };
                    request.open("get", "deneme.json", true);
                    request.send();
                };
                MyComponent.prototype.capitalize = function (input) {
                    input = input.toLowerCase();
                    return input.substring(0, 1).toUpperCase() + input.substring(1);
                };
                MyComponent.prototype.addField = function () {
                    var addedType = $("#selectTypeForm option:selected").text().toLowerCase();
                    var addedLabel = this.capitalize($("#addedFieldLabel").val());
                    var addedRequired = $("#requiredInputCheck").prop("checked").toString();
                    var addedConfirmID = this.newAddedField + this.field_counter + "Confirm";
                    var addedID = this.newAddedField + this.field_counter;
                    var self = this;
                    if (addedType == 'dropdown') {
                        addedType = 'select';
                    }
                    this.data.push({
                        "id": addedID,
                        "type": addedType,
                        "label": addedLabel,
                        "required": addedRequired,
                    });
                    if (addedType == "password") {
                        this.data[this.data.length - 1]['confirmID'] = addedConfirmID;
                        this.data[this.data.length - 1]['min'] = 8;
                    }
                    else if (addedType == "radio" || addedType == "checkbox" || addedType == "select") {
                        this.data[this.data.length - 1]['options'] = this.addedOptions;
                    }
                    this.changeDetector.detectChanges();
                    if (addedRequired == 'true') {
                        $("#" + addedID).attr("required", "required");
                    }
                    if (addedType == "password") {
                        // EĞER EKLENEN PASSWORD İSE CONFIRM EDİLDİĞİ ALANA DA REQUIRED ÖZELLİĞİ EKLE VE DATA MATCH İÇİN
                        // ATTRIBUTE EKLE
                        $("#" + addedConfirmID).attr("required", "required");
                        $("#" + addedConfirmID).attr("data-match", "#" + addedID);
                        if (addedRequired == 'true') {
                            if (self.language == "en") {
                                $("#" + addedID).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['en'] + "\')");
                                $("#" + addedConfirmID).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['en'] + "\')");
                            }
                            else {
                                $("#" + addedID).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['tr'] + "\')");
                                $("#" + addedConfirmID).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['tr'] + "\')");
                            }
                            $("#" + addedID).attr("oninput", "this.setCustomValidity(\'\')");
                            $("#" + addedConfirmID).attr("oninput", "this.setCustomValidity(\'\')");
                        }
                    }
                    if (addedType == "checkbox" || addedType == "radio") {
                        if (addedRequired == "true") {
                            $.each(self.addedOptions, function (index, obj) {
                                $("#" + obj.id).attr("required", "required");
                                if (addedType == "radio") {
                                    if (self.language == "en") {
                                        $("#" + obj.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.radio_error['en'] + "\')");
                                    }
                                    else {
                                        $("#" + obj.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.radio_error['tr'] + "\')");
                                    }
                                    $("#" + obj.id).attr("onclick", "this.setCustomValidity(\'\')");
                                }
                            });
                        }
                    }
                    this.addedOptions = [];
                    this.field_counter++;
                    $("#myForm").validator('update');
                };
                MyComponent.prototype.addOption = function () {
                    var myName = $("#addedOption").val();
                    var myID = "myoption" + this.option_counter;
                    this.addedOptions.push({ "id": myID, "name": myName });
                    this.option_counter++;
                };
                MyComponent.prototype.showAddScreen = function () {
                    if (this.situation == true)
                        this.situation = false;
                };
                MyComponent.prototype.showFormScreen = function () {
                    if (this.situation == false)
                        this.situation = true;
                };
                MyComponent.prototype.stringify = function (input) {
                    return JSON.stringify(input);
                };
                MyComponent = __decorate([
                    core_1.Component({
                        selector: 'form-generator',
                        templateUrl: 'form-generator.html',
                        styleUrls: ['form-generator.css']
                    }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], MyComponent);
                return MyComponent;
            }());
            platform_browser_dynamic_1.bootstrap(MyComponent);
        }
    }
});
