/**
 * Elementary Cellular Automaton plugin
 * Created by Krekog on 04/03/2017.
 *
 * This plugin displays an elementary cellular automaton through the use of divs.
 * Read more on cellular automatons [here](http://atlas.wolfram.com/01/01/)
 */
(function( $ ) {
    /** functions */
    $.fn.bindECA = function(options) {

        let settings = $.extend({
            numberOfCells: 50,
            speed: 500,
            ruleNumber: 26,
            classOfStateContainer: 'stateContainer',
            classOfActive: 'active',
            classOfInactive: 'inactive',
            colorOfActive: '#2ca02c',
            colorOfInactive: 'transparent',
            initialState: null,
        }, options);

        let host = $(this);
        let StateContainer = null;
        let timer = null;

        let generateState = function() {
            let lastRow = StateContainer.children().last();
            let newRow = lastRow.clone();

            applyRules(lastRow, newRow);

            addNewRow(newRow);
        };

        let applyRules = function (previousRow, row) {
            let newRowElements = row.children();
            let lastRowElements = previousRow.children();
            let currentRule = (settings.ruleNumber >>> 0).toString(2).split('').reverse();
            newRowElements.each(function (i, element) {
                let $element = $(element);
                let neighbors =
                    isActiveCell(
                        $element.is(newRowElements.first()) ?
                            lastRowElements.last() :
                            lastRowElements[i - 1])
                    + isActiveCell(lastRowElements[i])
                    + isActiveCell(
                        $element.is(newRowElements.last()) ?
                            lastRowElements.first() :
                            lastRowElements[i + 1]
                    );
                neighbors = parseInt(neighbors, 2);

                if (Number(currentRule[neighbors])) {
                    $element
                        .removeClass(settings.classOfInactive)
                        .addClass(settings.classOfActive)
                        .css('background-color', settings.colorOfActive);
                } else {
                    $element
                        .removeClass(settings.classOfActive)
                        .addClass(settings.classOfInactive)
                        .css('background-color', settings.colorOfInactive);
                }
            });
        }

        let isActiveCell = function (cell) {
            return $(cell).hasClass(settings.classOfActive) ? '1' : '0';
        };
        let createStartingCell = function () {
            return $('<div></div>')
                .append($('<img>')
                    .attr("src", 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif')
                    .css('width', '100%')
                ).css('flex-grow', '1')
                .css('display', 'inline-block')
                .css('object-fit', 'contain');
        };
        let createStartingRow = function () {
            let newRow = $('<div></div>')
                .css('display', 'flex')
                .css('flex-wrap', 'nowrap')
                .css('justify-content', 'space-between').addClass('row');
            for (let i = 0; i < settings.numberOfCells; i++) {
                newRow.append(createStartingCell());
            }
            StateContainer.append(newRow);
            return newRow;
        };
        let addNewRow = function (newRow) {
            StateContainer.append(newRow);
        }

        let randomizeRow = function(row) {
            row.children().each(function () {
                let isNewCellActive = (Math.round(Math.random()));
                $(this)
                    .addClass(isNewCellActive ? settings.classOfActive : settings.classOfInactive)
                    .css('background-color', isNewCellActive ? settings.colorOfActive : settings.colorOfInactive);
            });
        };

        let setRowToInitialState = function(row, state) {
            row.children().each(function (i) {
                let isNewCellActive = Number(state[i]);
                $(this)
                    .addClass(isNewCellActive ? settings.classOfActive : settings.classOfInactive)
                    .css('background-color', isNewCellActive ? settings.colorOfActive : settings.colorOfInactive);
            });
        }

        let initialise = function () {
            StateContainer = $('<div></div>')
                .addClass(settings.classOfStateContainer);
            host.append(StateContainer)

            let startingRow = createStartingRow();
            if (settings.initialState) {
                setRowToInitialState(startingRow, settings.initialState);
            } else {
                randomizeRow(startingRow);
            }
        };

        let destroy = function() {
            stop();
            host
                .find('.' + settings.classOfStateContainer)
                .remove();
        };

        let reInitialise = function () {
            destroy();
            initialise();
        };

        let start = function () {
            if (!timer) {
                generateState();
                timer = setInterval(function () {
                    generateState();
                }, settings.speed);
            }
        };

        let stop = function () {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };

        let reset = function () {
            reInitialise();
        };

        initialise();

        /** bind events*/
        this.on('start.ECA', function() {
            start();
        });
        this.on('stop.ECA', function() {
            stop();
        });
        this.on('reset.ECA', function() {
            reset();
        });
        this.on('setRule.ECA', function(e) {
            settings.ruleNumber = e.rule;
        });
        this.on('setColorOfActive.ECA', function(e) {
            settings.colorOfActive = e.color;
        });
        this.on('setColorOfInactive.ECA', function(e) {
            settings.colorOfInactive = e.color;
        });
        this.on('setNumberOfCells.ECA', function(e) {
            settings.numberOfCells = e.numberOfCells;
            reInitialise();
        });
        this.on('setInitialState.ECA', function(e) {
            settings.initialState = e.initialState;
            reInitialise();
        });

        return this;
    };

    $.fn.startECA = function() {
        this.trigger('start.ECA');
        return this;
    };

    $.fn.stopECA = function() {
        this.trigger('stop.ECA');
        return this;
    };

    $.fn.resetECA = function() {
        this.trigger('reset.ECA');
        return this;
    };

    $.fn.setRule = function( rule ) {
        this.trigger({
            type: 'setRule.ECA',
            rule: rule
        });
        return this;
    };

    $.fn.setColorOfActive = function( color ) {
        this.trigger({
            type: 'setColorOfActive.ECA',
            color: color
        });
        return this;
    };

    $.fn.setColorOfInactive = function( color ) {
        this.trigger({
            type: 'setColorOfInactive.ECA',
            color: color
        });
        return this;
    };

    $.fn.setNumberOfCells = function( numberOfCells ) {
        this.trigger({
            type: 'setNumberOfCells.ECA',
            numberOfCells: numberOfCells
        });
        return this;
    };

    $.fn.setInitialState = function( initialState ) {
        this.trigger({
            type: 'setInitialState.ECA',
            initialState: initialState
        });
        return this;
    };

}( jQuery ));
/** Elementary Cellular Automaton plugin end */
