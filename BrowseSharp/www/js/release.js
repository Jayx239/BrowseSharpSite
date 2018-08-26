function jsonLoader(jsonFilePath) {
    this.jsonFilePath = jsonFilePath;
    this.jsonFileContents;

    this.loadFile = function (callback) {
        $.ajax({
            type: 'GET',
            url: "data/ReleaseNotes.json",
            contentType: "JSON",
            success: function (data) {
                this.jsonFileContent = data;
                if (callback && typeof callback === 'function') {
                    return callback(data);
                }
            }

        })/*.done(function(data) {
            this.jsonFileContent = data;
            if (callback && typeof callback === 'function') {
                var callbackData = data;
                if(data.responseText)
                    callbackData = JSON.parse(data.responseText);

                return callback(callbackData);
            }
                console.log(data);
        });*/
    };

    this.getData = function (callback) {
        if (this.jsonFileContent) {
            return callback(this.jsonFileContent);
        }
        else {
            return loadFile(callback);
        }
    };

    return {
        JsonFilePath: this.jsonFilePath,
        LoadFile: this.loadFile,
        GetData: this.getData
    };
};

function switcher(outputDom, switchData) {
    this.outputDom = outputDom;
    /* DOM where formatted output will be placed */
    this.switchData = switchData;
    /* Json Data */


    /*this.formatData = function (key, data) {
        return "Format Data Method Not Implemented";
    };*/

    this.switch = function (key, data) {
        $(outputDom).html(formatData(key, data));
    };
    this.formatData = function (key, data) {
        var selectedData = data.releases[key];
        var outputText = "<div class='row'><div class='col-12'><h4>" +
            selectedData.displayName +
            "</h4></div></div><div class='row download-links align-items-center mb-4'><div class='col-12'>";
        if (selectedData.downloadLinks) {
            var downloadLinks = selectedData.downloadLinks;
            for (var i = 0; i < downloadLinks.length; i++) {
                outputText += "<div class='" + downloadLinks[i].class + "'>"
                if (downloadLinks[i].useImage)
                    outputText += "<a href='" + downloadLinks[i].url + "'><img src='" + downloadLinks[i].imgUrl + "'/></a>"
                else
                    outputText += "<span>" + downloadLinks[i].displayText + "</span>"
                outputText += "</div>";
            }
        }

        outputText += "</div></div><div class='row'><div class='col-12'>" +
            selectedData.notesHtml +
            "</div></div>"
        return outputText;

    };
    return {
        OutputDom: this.outputDom,
        Switch: this.switch,
        FormatData: this.formatData

    }
};

function releaseSwitcher(jsonFilePath, outputDom, defaultReleaseIndex) {
    this.jsonData;
    this.outputDom = outputDom;
    this.jsonFilePath = jsonFilePath;
    this.customSwitcher;
    this.defaultReleaseIndex = defaultReleaseIndex;
    var initialize = function (callback) {
        jsonLoader(this.jsonFilePath).GetData(function (data) {
            this.jsonData = data;
            this.customSwitcher = switcher(outputDom, data);
            this.customSwitcher.FormatData = this.formatData;
            if (callback && typeof callback === 'function')
                callback();
        })
    };


    this.formatData = function (key, data) {
        var selectedData = data[key];
        var outputText = "<div class='row'><div class='col-12'><h4>" +
            selectedData.displayName +
            "</h4></div></div><div class='row download-links'><div class='col-12'>"
        if (selectedData.downloadLinks) {
            var downloadLinks = selectedData.downloadLinks;
            for (var i = 0; i < downloadLinks.length; i++) {
                outputText += "<div class='col " + downloadLinks[i].class + "'>"
                if (downloadLinks.useImage)
                    outputText += "<img src='" + outputText[i].imgUrl + "'/>"
                else
                    outputText += "<span>" + downloadLinks[i].displayText + "</span>"
                outputText = "</div>";
            }
        }

        outputText = "</div></div><div class='row'><div class='col-12'>" +
            selectedData.noteHtml +
            "</div></div>";

    };

    this.createDropdownItems = function (outputDom) {
        initialize(function () {
            if (this.jsonData.releases) {
                var releases = this.jsonData.releases;
                var versionDropdownListText = "";
                for (var i = 0; i < releases.length; i++) {
                    versionDropdownListText += "<a class='dropdown-item' data-index='" + i + "'>" + releases[i].name + "</a>";
                }

                this.customSwitcher.Switch(releases.length-1,this.jsonData);

                $(outputDom).html(versionDropdownListText);
                $("#VersionDropdownList .dropdown-item").click(function() {
                    var index = $(this).data("index");
                    customSwitcher.Switch(index, jsonData);
                });
            }
        });
    };
    initialize();
    return {
        JsonData: this.jsonData,
        OutputDom: this.outputDom,
        Switcher: this.customSwitcher,
        CreateDropdownItems: this.createDropdownItems,
    };
};