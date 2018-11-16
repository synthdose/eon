function setUpSearch(selector) {
    // Search listener
    document.querySelector(selector).onSearch(function (filters) {
        // Loop filtering targets
        refs.tree.refresh(filters.tText);
    });
}

function loadEonExamples() {
    var anchor, activePanel, groupId;
    // Configure tree
    var treeScroll = refs.tree.querySelector("eon-scroll");
    treeScroll.thickness = "10";
    // Load vComet element example
    refs.tree.onNodeSelected(function (node) {
        // Go to group file
        groupId = node._refs.parentNode.tagName == "EON-TREENODE" ? node._refs.parentNode.id : node.id;
        refs.view.swapToPanel(groupId);
        // Get active panel
        activePanel = refs.view.getActivePanel();
        var panelScroll = activePanel.$1("eon-scroll");
        // Get node related anchor
        anchor = activePanel.querySelector("[state=" + node.id + "]");
        if (anchor) {
            // Scroll to the specific element section
            panelScroll.scrollTop = [anchor.getOffsetPosition(), true];
        }
    })
}

function toggleMenu(forceAction) {
    var drawer = document.querySelector(".tTreeContainer");
    if ((drawer._misc.displayed && !forceAction) || forceAction == "close") {
        drawer.close();
    } else if ((!drawer._misc.displayed && !forceAction) || forceAction == "open") {
        drawer.show();
    }
}

function initializePlayground(sectionsClass, pgClass) {
    // PROBABLY NECESSARY DUE TO EON-PANEL SCRIPTS MANAGEMENT (to be removed...)
    setTimeout(function () {
        // Initialize playground
        var sections = document.querySelector(sectionsClass).content.children;
        var pg = document.querySelector(pgClass);
        // Set playground content
        pg.onReady(function () {
            var pgObj = {
                head: sections[0].innerHTML,
                body: sections[1].innerHTML,
                js: sections[2].innerHTML,
                css: sections[3].innerHTML
            };
            pg.setData(pgObj);
        });
        // Get content height
        pg.onContentSet(function(iframe){
            // Iframe on content loaded 
            eon.createCallback("onLoaded", iframe);
            // Make playground fit its iframe content
            iframe.onLoaded(function(){
                var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                var scroll = innerDoc.body.children[0];
                scroll.onReady(function(){
                    setPgHeight(pg, scroll.children[0].querySelector(".row").offsetHeight);
                });
                // Playground resize listener
                playgroundResizeListener(pgClass, innerDoc);
            });
        });
    }, 0);
}

function playgroundResizeListener(selector, innerDoc) {
    var pg = document.querySelector(selector);
    // Resize listener
    pg.onResize(function(){
        if(innerDoc.body) {
            // Get scroll content
            var scroll = innerDoc.body.children[0];
            scroll.onReady(function(){
                // Get rows size
                var size = 0;
                for (var i = 0; i < scroll.children[0].querySelectorAll(".row").length; i++) {
                    size += scroll.children[0].querySelectorAll(".row")[i].offsetHeight;
                }
                // Set playground new size
                setPgHeight(pg, size);
            });
        }
    });
}

function setPgHeight(pg, size) {
    // Check null values
    if(size) {
        pg.style.height = 37 + size + "px";
    }
}