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