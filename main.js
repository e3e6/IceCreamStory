/**
 * Created with JetBrains WebStorm.
 * User: alex
 * Date: 6/8/13
 * Time: 5:39 PM
 * To change this template use File | Settings | File Templates.
 */


function showDialog(){
    debug('Action');
}

function displayChildrens(childrens){

    var storyUl = document.getElementById('story');
    for(var i = 0; i < childrens.length; i++){
        var li = document.createElement("li");
            li.appendChild(document.createTextNode(childrens[i].toString()));
        storyUl.appendChild(li);
    }
}


function initStory(){
    debug('initStory');
    var childrens = [new Children("Jhon", "eat", "apple"),
        new Children("Jack", "lick", "brick"),
        new Children("Olga", "throw", "TNT") ];
    displayChildrens(childrens);
}

/**
 * Cross-browser listener
 * @param evnt Event name
 * @param elem Element
 * @param func Function will be executed when event will occur
 * @returns {*}
 */
function listen(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        var r = elem.attachEvent("on"+evnt, func);
        return r;
    }
}
listen("load", window, initStory);