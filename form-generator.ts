/* **************************
    CREATED BY CAN ALTINİĞNE
    ARGELA SUMMER INTERNSHIP
             08/16
   ************************* */

   // bootstrap validator ayrı bir şekilde yüklenebilir
   // npm i install  bootstrap-validator

/// <reference path="typings/globals/jquery/index.d.ts" />
import {Component, Pipe, PipeTransform, ChangeDetectorRef, ChangeDetectionStrategy, Input} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';


@Pipe({
    name: 'keys',
    pure: true
})
class KeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        var keys = [];
        for (let key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    }
}

@Component({
    selector: 'form-generator',
    templateUrl: 'form-generator.html',
    styleUrls: ['form-generator.css'],
    pipes: [KeysPipe]
})

class MyComponent {
    data: any;
    form_name: string;
    language: string = 'en';
    minimumLength: string = "";
    field_counter: number = 1;
    newAddedField: string = "mynewfield";
    addedOptions = [];
    option_counter: number = 1;
    situation: boolean = true;

    app_messages: any = {
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
    }

    constructor(private changeDetector: ChangeDetectorRef) {
        this.getJSONFile();

    }

    // LOCAL JSON DOSYASININ OKUNMASI

    private getJSONFile(): any {
        var request = new XMLHttpRequest();
        var self = this;

        request.onload = function() {
            self.data = JSON.parse(this.responseText);
            self.form_name = self.data[0];

            self.changeDetector.detectChanges();    // SAYFA TAMAMEN DOLMADAN JQUERY ÇALIŞTIRMA

            $.each(self.data, function(key, value) {

                if (value == "en" || value == "tr") {        // DİL DEĞERİNİ ATA
                    self.language = value;
                }

                if (value.required == "true") {         // REQUIRED ALANLARA REQUIRED ATTRIBUTE EKLE
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
                        } else {
                            $("#" + value.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['tr'] + "\')");
                            $("#" + value.confirmID).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['tr'] + "\')");
                        }
                        $("#" + value.id).attr("oninput", "this.setCustomValidity(\'\')");
                        $("#" + value.confirmID).attr("oninput", "this.setCustomValidity(\'\')");
                    }
                }

                if (value.type == "checkbox" || value.type == "radio") {    // CHECKBOX VE RADIO BUTTONLAR İÇİN REQUIRED ÖZELLİĞİ EKLE
                    if (value.required == "true") {
                        $.each(value.options, function(index, obj) {
                            $("#" + obj.id).attr("required", "required");

                            if (value.type == "radio") {
                                if (self.language == "en") {
                                    $("#" + obj.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.radio_error['en'] + "\')");
                                } else {
                                    $("#" + obj.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.radio_error['tr'] + "\')");
                                }

                                $("#" + obj.id).attr("onclick", "this.setCustomValidity(\'\')");
                            }
                        });
                    }
                }
            });

            document.getElementById("addFieldArea").style.display = "block";
            document.getElementById("dynamicArea").style.display = "none";
            console.log(self.data);
            $("#myForm").validator();     // BOOTSTRAP VALIDATOR ÇALIŞTIR

        }

        request.open("get", "deneme.json", true);
        request.send();
    }

    private capitalize(input: string): any {
        input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }

    public addField(): any {

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

        if(addedType == "password"){    // GEREKSİZ YERLERİ PUSHLAMA HEPSİ İÇİN
          this.data[this.data.length - 1]['confirmID'] = addedConfirmID;
          this.data[this.data.length - 1]['min'] = 8;
        } else if (addedType == "radio" || addedType == "checkbox" || addedType == "select"){
          this.data[this.data.length - 1]['options'] = this.addedOptions;
        }

        this.changeDetector.detectChanges();

        if (addedRequired == 'true') {         // REQUIRED ALANLARA REQUIRED ATTRIBUTE EKLE
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
                } else {
                    $("#" + addedID).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['tr'] + "\')");
                    $("#" + addedConfirmID).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.password_error['tr'] + "\')");
                }
                $("#" + addedID).attr("oninput", "this.setCustomValidity(\'\')");
                $("#" + addedConfirmID).attr("oninput", "this.setCustomValidity(\'\')");
            }
        }

        if (addedType == "checkbox" || addedType == "radio") {    // CHECKBOX VE RADIO BUTTONLAR İÇİN REQUIRED ÖZELLİĞİ EKLE
            if (addedRequired == "true") {
                $.each(self.addedOptions, function(index, obj) {
                    $("#" + obj.id).attr("required", "required");

                    if (addedType == "radio") {
                        if (self.language == "en") {
                            $("#" + obj.id).attr("oninvalid", "this.setCustomValidity(\'" + self.app_messages.radio_error['en'] + "\')");
                        } else {
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
    }

    public addOption(): any {
        var myName = $("#addedOption").val();
        var myID = "myoption" + this.option_counter;
        console.log(typeof myID);
        this.addedOptions.push({ "id": myID, "name": myName });
        this.option_counter++;
    }

    public showAddScreen(): any {
        if (this.situation == false) {
            document.getElementById("addFieldArea").style.display = "block";
            document.getElementById("dynamicArea").style.display = "none";
            this.situation = true;
        }
    }

    public showFormScreen(): any {
        if (this.situation == true) {
            document.getElementById("addFieldArea").style.display = "none";
            document.getElementById("dynamicArea").style.display = "block";
            this.situation = false;
        }
    }

    public stringify(input: any): string {
        return JSON.stringify(input);
    }
}

bootstrap(MyComponent);
