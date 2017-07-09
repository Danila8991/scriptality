(function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? '0'+ now.getDate() : now.getDate() ;

    var json = {
        list: [
        {
            count: 1,
            description: 'Забрать одежду из химчистки',
            datepicker: day + '.' + month + '.' + year
        }]
    }

    var source = document.getElementById('entry-template').innerHTML;
    var template = Mustache.render(source ,json);
    var buttonGETJSON = document.createElement('span');

    buttonGETJSON.innerHTML = 'Выгрузить json';

    buttonGETJSON.addEventListener('click', function(){
        getJSON();
    }, true);

    document.getElementById('entry').innerHTML = template;

    init();


    function innerButton() {
        if (json.list.length > 1) {
            document.body.appendChild(buttonGETJSON);
        } else {
            buttonGETJSON.remove();
        }
    }


    function getJSON() {
        prepList();
        console.log(json.list);
    }

    function datepickers() {
        document.querySelectorAll('.datepicker').forEach(function(item) {
            flatpickr(item, {
                dateFormat: 'd.m.Y' 
            });
        });
    }

    function init() {
        clickPlus();
        clickMinus();
        datepickers();
        innerButton();
    }

    function clickPlus() {
        var pluses = document.querySelectorAll('.fa-plus');

        pluses.forEach(function(item, index) {
            item.addEventListener('click', function() {
                add();
            }, true);
        });
    }

    function add() {
        prepList();
        json.list.push({
            count: json.list.length + 1,
            description: '',
            datepicker: day + '.' + month + '.' + year
        });
        document.getElementById('entry').innerHTML = Mustache.render(source ,json);
        init()
    };

    function clickMinus() {
        var minuses = document.querySelectorAll('.fa-times');

        if (minuses.length <= 1) {
            return;
        }
        minuses.forEach(function(item, index) {
            item.addEventListener('click', function() {
                remove(index);
            }, true);
        });
    }


    function prepList() {
        var formList = document.querySelectorAll('.group-list');
        var list = [];

        formList.forEach(function(item, index) {
            list.push({
                count: index + 1,
                description: item.querySelector('[name=description]').value,
                datepicker: item.querySelector('[name=datepicker]').value,
            });
        });

        json.list = list;
    }

    function prepCount() {
        json.list.forEach(function(item, index) {
            item.count = index + 1;
        });
    }

    function remove(index) {
        json.list.splice(index, 1);
        prepCount();
        document.getElementById('entry').innerHTML = Mustache.render(source ,json);
        init();
    }

})();