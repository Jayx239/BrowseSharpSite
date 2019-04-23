
var currentApiDocument = {};

var documentList = {
    "0.0.3": "BrowseSharp003.xml",
    "0.0.4-alpha": "BrowseSharp004a.xml",
    "0.0.4-beta": "BrowseSharp004b.xml",
    "0.0.4": "BrowseSharp004.xml",
    "0.0.5-alpha": "BrowseSharp005a.xml",
    "0.0.5-beta": "BrowseSharp005b.xml",
    "0.0.5": "BrowseSharp005.xml",
    "0.0.6-alpha": "BrowseSharp006a.xml",
    "0.0.6-beta": "BrowseSharp006b.xml",
    "0.0.6": "BrowseSharp006.xml",
    "0.0.7-alpha": "BrowseSharp007a.xml",
    "0.0.7-beta": "BrowseSharp007b.xml",
    "0.0.7": "BrowseSharp007.xml",
    "0.0.8-alpha": "BrowseSharp008a.xml",
    "0.0.8-beta": "BrowseSharp008b.xml",
    "0.0.8": "BrowseSharp008.xml"
};



var loadApiDocument = function(fileName) {
    $("#Title");
    $.ajax({
        url: "api/" + fileName,
        method: "get",
        dataType: "xml"
    }).done(function(data) {
        currentApiDocument = data;
        renderDocument($("#menu"), $("#content"));
    });
};

var renderDocument = function(menu, content) {

    var assemblys = currentApiDocument.documentElement.getElementsByTagName("assembly");
    var menuContent = "";
    var bodyContent = "";
    menuContent = "<div>" +
        currentApiDocument.documentElement.getElementsByTagName("assembly")[0].getElementsByTagName("name")[0].textContent
    "</div>";

    for(var i=0; i<assemblys.length; i++) {
        //console.log(assemblys[i].getElementsByTagName("name")[0].textContent);
    }
    var members = currentApiDocument.documentElement.getElementsByTagName("members");
    console.log(members);
    for(var i=0; i< members.length; i++) {
        var member = members[i].getElementsByTagName("member");
        for(var j=0; j<member.length; j++) {
            bodyContent +="<div>" +
                "<ul>" +
                    "<li>" +
                        "<span>" +
                            member[j].attributes["name"].value +
                        "</span>" +
                    "</li>";
            if(member[j].textContent.trim() !== "")
                bodyContent +=
                    "<li>" +
                        "<ul>" +
                            "<li>" +
                                "<span>" +
                                    member[j].textContent +
                                "</span>" +
                            "</li>" +
                        "</ul>" +
                    "</li>";
                bodyContent +=
                    "</ul>" +
                "</div>";

            menuContent += "<div>" +
                member[j].attributes["name"].value +
                "</div>"
            //console.log(member[j].attributes["name"]);
            //console.log(member[j].textContent);
        }
    }


    if(content)
        $(content).html(bodyContent);
    //if(menu)
      //  $(menu).html(menuContent);
};


var loadMenu = function() {
    var items = "";
    for(var key in Object.keys(documentList)) {
        items += "<a class=\"dropdown-item\" onclick=\"loadApiDocument('" +  documentList[Object.keys(documentList)[key]] + "');$('#Title').text('" + Object.keys(documentList)[key] + "');\">" + Object.keys(documentList)[key] + "</a>";
    }

    $("#VersionDropdownList").html(items);
};