var container = document.getElementById('section-content'),
    parser = new DOMParser();

function readTextFile (file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                callback(allText);
            }
        }
    };
    rawFile.send(null);
}

function append (text) {
    while (container.children.length) { container.removeChild(container.children[0]); }
    container.appendChild(parser.parseFromString('<div>' + markdown.toHTML(text) + '</div>', 'text/html').body.children[0]);
}

function appendMarkdown (text) { container.append(markdown.toHTML(text)); };

function appendMarkdownFromFile (fileName) {
    readTextFile(
        'contents/' + fileName + '?version=' + Math.floor(Math.random()*10000), // prevent caching
        function(text) { append(text); }
    );
}

function appendMarkdownFromURL (url) {
    readTextFile(
        url,
        function(text) { append(text); }
    );
}

function appendMarkdownFromGitHub (fileName) {
    appendMarkdownFromURL('https://cdn.rawgit.com/bromagosa/bromagosa.github.io/master/contents/' + fileName);
}

function select (sectionName, remote) {
    if (remote) {
        appendMarkdownFromGitHub(sectionName + '.md');
    } else {
        appendMarkdownFromFile(sectionName + '.md');
    }
}
