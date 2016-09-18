(function() {


    var menuExample = [{
        title: 'File',
        action: function() {
            alert('open file');
        }
    }, {
        title: 'Edit',
        action: function() {
            alert('edit content');
        }
    }, {
        title: 'More stuff',
        submenu: [{
            title: 'Send by email',
            action: function() {
                alert('emailed');
            }
        }, {
            title: 'Send via skype',
            action: function() {
                alert('skyped');
            }
        }]
    }];

    var node = document.querySelector('.tagClick');
    var createMenuExample = buildMenu(menuExample);
    var addMenuDOM = addList(createMenuExample);
    node.addEventListener('contextmenu', positionContextMenu, false);
    document.documentElement.addEventListener('click', clickInsideElement, false);
    document.documentElement.addEventListener('keyup', keyupContextMenu, false);
    initiationSubMenu();

    function buildMenu(structure) {

        var root = document.createElement('ul');
        root.className = 'context-menu';
        var menuItemNode;
        var subMenuNode;

        for (var i = 0; i < structure.length; i += 1) {
            menuItemNode = document.createElement('li');
            menuItemNode.innerText = structure[i].title;

            if (structure[i].submenu) {
                subMenuNode = document.createElement('span');
                subMenuNode.innerText = '>';
                menuItemNode.className += 'context-menu__submenu';
                menuItemNode.appendChild(buildMenu(structure[i].submenu));
                menuItemNode.appendChild(subMenuNode);
            } else {
                menuItemNode.addEventListener('click', structure[i].action, false);
            }
            root.appendChild(menuItemNode);
        }
        return root;
    }

    function addList(addNodeList) { // add items into the DOM 
        return document.body.appendChild(addNodeList);
    }

    function positionContextMenu(event) {
        event.preventDefault(); // cancel the default context menu
        var x = event.clientX; // get the coordinates x
        var y = event.clientY; // get the coordinates y
        show(x, y);
    }

    function show(left, top) {
        createMenuExample.style.display = 'block';
        createMenuExample.style.left = left + 'px'; // show on the menu coordinate x
        createMenuExample.style.top = top + 'px'; // show on the menu coordinate x
    }

    function initiationSubMenu() {
        var submenuHolders = document.querySelector(".context-menu__submenu");
        var submenu = submenuHolders.querySelector('ul');
        submenuHolders.addEventListener('mouseenter', function() {
            submenu.style.display = 'block';
        }, false);
        submenuHolders.addEventListener('mouseleave', function() {
            submenu.style.display = 'none';
        }, false);
    }

    function WalkerClickInside(node, testFunc, lastParent) {
        while (node && node !== lastParent) {

            if (testFunc(node)) {
                return node;
            }
            node = node.parentNode;
        }
    }

    function clickInsideElement(event) {
        var menu = this.menu;

        if (!WalkerClickInside(event.target, function(node) {
                return menu === node;
            })) {
            hide();
        }
    }

    function hide() {
        addMenuDOM.style.display = 'none';
    }

    function keyupContextMenu(event) {

        if (event.keyCode === 27) {
            hide();
        }
    }

}());