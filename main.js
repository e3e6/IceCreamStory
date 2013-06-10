/**
 * Created with JetBrains WebStorm.
 * User: alex
 * Date: 6/8/13
 * Time: 5:39 PM
 * To change this template use File | Settings | File Templates.
 */


var childrenList = [new Children("John", "eat", "apple"),
    new Children("Jack", "lick", "brick"),
    new Children("Olga", "throw", "TNT") ];

var iceCreamTastes = ['chocolate', 'strawberry', 'vanile'];

var iceCreamShapes = ['cone', 'cream', 'stick'];

var actions = ['bite', 'blow', 'leak', 'crash', 'sell'];

/**
 * Show master to change the child
 */
function showDialog(){
    debug('Action');

    master.show(new Array({name: "Child", data:childrenList},
        {name: "Action", data:actions},
                          {name: 'Shape', data:iceCreamShapes},
                          {name: 'Taste', data:iceCreamTastes})
                , onComplete);

    document.getElementById('content').style.display = 'none';
    master._container.style.display = 'block';
}

/**
 * Callback when finishing the master
 */
function onComplete(data){
    debug('dialog completed');

    document.getElementById('content').style.display = 'block';
    master._container.style.display = 'none';

    for(var i=0; i < childrenList.length; i++){
        if(childrenList[i] === data[0].data){
            var ice = new IceCream(data[2].data, data[3].data);

            var child = childrenList[i];
                child.actionItem = ice;
                child.action  = data[1];
        }
    }
    displayChildrens();
}

/**
 *
 */
function displayChildrens(){

    storyUl = document.getElementById('story');

    storyUl.innerHTML = '';

    for(var i = 0; i < childrenList.length; i++){
        var li = document.createElement("li");
            li.appendChild(document.createTextNode(childrenList[i].print()));
        storyUl.appendChild(li);
    }
}

/**
 *
 */
function initStory(){
    debug('initStory');
    displayChildrens();

    master = new ChooseMaster(document.getElementById('dialog'));

}

listen("load", window, initStory);