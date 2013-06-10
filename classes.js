/**
 * Created with JetBrains WebStorm.
 * User: alex
 * Date: 6/8/13
 * Time: 6:05 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Children class
 * @param name
 * @param action
 * @param item
 * @constructor
 */
function Children(name, action, item) {
    this.name = name;
    this.currentAction = action;
    this.actionItem = item;
}

Children.prototype.toString = function(){
    return this.name;
}

Children.prototype.print = function(){
    return this.name + ' ' + this.currentAction + ' ' + this.actionItem;
}


/**
 * Ice Cream class
 * @param shape
 * @param taste
 * @constructor
 */
function IceCream(shape, taste){
    this.shape = shape;
    this.taste = taste;
}

IceCream.prototype.toString = function(){
    return this.taste + ' ' + this.shape;
}