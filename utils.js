/**
 * Created with JetBrains WebStorm.
 * User: alex
 * Date: 6/8/13
 * Time: 8:11 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Safe debug out
 * @param msg
 */
function debug(msg){
    if(window.console){
        console.log(">> " + msg);
    }
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