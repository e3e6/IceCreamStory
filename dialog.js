/**
 * Created with JetBrains WebStorm.
 * User: alex
 * Date: 6/8/13
 * Time: 8:18 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 *
 * @constructor
 */
function ChooseMaster(container){

    var self = this;

    /**
     *
     */
    this._container = container;
    /**
     *
     */
    this._callback;

    /**
     *
     * @type {number}
     */
    this._screen = 0;

    /**
     *
     * @type {Array}
     */
    this._data = new Array();

    /**
     *
     * @type {Array}
     * @private
     */
    this._results = new Array();


    this._lblNext = '    Next    ';
    this._lblPrev = 'Previous';
    this._lblFinish = 'Finish';


    /**
     *
     * @private
     */
    this._nextScreen = function(){
        self._screen++;
        self._displayScreen();
    }

    /**
     *
     * @private
     */
    this._prevScreen = function(){
        self._screen--;
        self._displayScreen();
    }

    /**
     *
     * @private
     */
    this._displayScreen = function(){
        debug('-- display screen[' + this._screen + ']');
        if(self._screen == 0){
            self._btnPrev.style.display = 'none';
        }else{
            self._btnPrev.style.display = 'inline';
        }

        var selectBox = document.getElementById('dialog-select');

        //remember selected value
        if(selectBox){
            var selected = selectBox.options[selectBox.selectedIndex];

            if(selected){
                //Push: sectionName, selectedItem

                var selectedItem = self._data[self._screen-1];

                self._results.push({name: selectedItem.name, data: selectedItem.data[selectBox.selectedIndex]});
            } else{
                self._screen--;
            }
        }

        //Clear dialog
        if(self._contentDiv){
            self._contentDiv.innerHTML = '';
        }else{
            return;
        }

        debug('screen[' + self._screen + '] data[' + self._data.length + ']');

        if(self._screen > self._data.length){
            self._screen = self._data.length;

            if(self._callback){
                self._callback(self._results);
                self._results = new Array();
            }

        } else {
            self._btnNext.setAttribute("value", self._lblNext);
        }

        //Show results
        if(self._screen == self._data.length){

            self._btnNext.setAttribute("value", self._lblFinish);
            self._innerLabel.innerText = 'Results';


            var dl = document.createElement('dl');

            for(var i=0; i < self._results.length; i++){
                var dt = document.createElement('dt');
                    dt.appendChild(document.createTextNode(self._results[i].name.toString()));

                var dd = document.createElement('dd');
                    dd.appendChild(document.createTextNode(self._results[i].data.toString()));

                dl.appendChild(dt);
                dl.appendChild(dd);
            }

            self._contentDiv.appendChild(dl);
            return;
        }

        //Show next dialog screen
        var _select = document.createElement('select');
            _select.setAttribute('multiple', 'multiple');
            _select.setAttribute('id', 'dialog-select');

        var item = self._data[self._screen];

        var itemData = item.data;
        var itemName = item.name;

        //Change dialog screen label
        self._innerLabel.innerText = itemName;

        for(var i =0; i < itemData.length; i++){
            var opt = document.createElement('option');
                opt.setAttribute('value', itemData[i]);
                opt.appendChild(document.createTextNode(itemData[i]));

            _select.appendChild(opt);
        }

        self._contentDiv.appendChild(_select);
    }

    /**
     *
     * @param n
     * @private
     */
    this._initScreen = function(){
        this._container.innerHTML = '';

        this._innerLabel = document.createElement("label");
        this._innerLabel.setAttribute("id", "dialog-screen-title");
        this._innerLabel.innerText = "%name%";

        var screenLabel = document.createElement("H3");
            screenLabel.appendChild(document.createTextNode("Select "));
            screenLabel.appendChild(this._innerLabel);

        this._container.appendChild(screenLabel);

        this._contentDiv = document.createElement("div");
        this._contentDiv.setAttribute("id", "dialog-screen-content");

        this._container.appendChild(this._contentDiv);

        var inputNext = document.createElement("input");
            inputNext.setAttribute("type", "button");
            inputNext.setAttribute("value", this._lblNext);

        var inputPrev = document.createElement("input");
            inputPrev.setAttribute("type", "button");
            inputPrev.setAttribute("value", this._lblPrev);

        var divC = document.createElement("div");
            divC.setAttribute("id", "dialog-buttons");
            divC.setAttribute("class", "controls");

            divC.appendChild(inputPrev);
            divC.appendChild(inputNext);

        this._container.appendChild(divC);

        this._btnNext = inputNext;
        this._btnPrev = inputPrev;

        listen('click', inputNext, self._nextScreen);
        listen('click', inputPrev, self._prevScreen);

        this._displayScreen();
    }



}

/**
 *
 * @param data
 * @param callback
 */
ChooseMaster.prototype.show = function(data, callback){
    this._callback =  callback;
    this._data = data;
    this._screen = 0;
    this._initScreen();
}