var commons = require("@vimlet/commons");
var path = require("path");
var fs = require("fs-extra");
var rimraf = require("rimraf");
var Sync = require("sync");

var vcometJsonObject = {};
var actualPackages = {};

var localPath;
var localVersionPath;
var localCustomPath;
var versionJsonObject = {};

module.exports = function () {
    vcometJsonObject = {};
    actualPackages = {};

    Sync(function () {
        try {
            // Reads vcomet.jason
            readVcometJson.sync(null);
            // Reads version.json
            readLocalVersions.sync(null);
            // Deletes unnecesary packages     
            deletePackages();

        } catch (error) {
            console.error("\x1b[91m", "\nError: " + error);
            console.error("\x1b[0m"); // Reset color + newLine
        }
    });
};

function readVcometJson(cb) {
    // Reads the vcomet.json to search the required versions
    if (fs.existsSync("vcomet.json")) {
        try {
            vcometJsonObject = JSON.parse(fs.readFileSync("vcomet.json").toString());
        } catch (error) {
            cb("Unexpected syntax while reading vcomet.json\n\n" + error);
        }

        // If the project does not have vcomoet.json
        // looks for a field "vcomet" in the package.json
    } else if (fs.existsSync("package.json")) {
        try {
            var packageJsonObject = JSON.parse(fs.readFileSync("package.json").toString());

            if (packageJsonObject.vcomet) {
                vcometJsonObject = packageJsonObject.vcomet;
            }

        } catch (error) {
            cb("Unexpected syntax while reading package.json\n\n" + error);
        }
    }
    
    cb();
}

function readLocalVersions(cb) {
    localPath = vcometJsonObject.path ? vcometJsonObject.path : "vcomet";
    localVersionPath = path.join(localPath, "version.json");
    localCustomPath = path.join(localPath, "custom");

    var foundPackages = {
        dependencies: {}
    };

    // In case of core and ui look for the file version.json inside the vcomet directory
    if (fs.existsSync(localVersionPath)) {
        try {
            versionJsonObject = JSON.parse(fs.readFileSync(localVersionPath).toString());
            foundPackages.core = versionJsonObject.core;
            foundPackages.ui = versionJsonObject.ui;
        } catch (error) {
            cb("Unexpected syntax while reading version.json\n\n" + error);
        }
    }

    var currentCustomPath;
    var currentCustomJsonObject;

    // In case of custom packages, look for the file version.json within th specific directory of each custom component
    if (fs.existsSync(localCustomPath)) {
        fs.readdirSync(localCustomPath).forEach(function (file) {
            currentCustomPath = path.join(localCustomPath, file, "custom.json");
            if (fs.existsSync(currentCustomPath)) {
                try {
                    currentCustomJsonObject = JSON.parse(fs.readFileSync(currentCustomPath).toString());
                    foundPackages.dependencies[file] = currentCustomJsonObject.version;
                } catch (error) {
                    cb("Unexpected syntax while reading custom.json\n\n" + error);
                }
            }
        });
    }

    actualPackages = foundPackages;
    cb();

}

function deletePackages() {
    var filePath;

    // Deletes core
    if (!vcometJsonObject.core && actualPackages.core) {
        fs.readdirSync(localPath).forEach(function (file) {
            if (file != "custom" && file != "ui" && file != "version.json") {
                filePath = path.join(localPath, file);
                console.log("Removing: " + filePath);
                // Using rimraf to avoid fs-extra not-empty errors
                rimraf.sync(filePath);
                // fs.removeSync(filePath);   
            }
        });
        delete versionJsonObject.core;
    }
    
    // Deletes UI
    if (!vcometJsonObject.ui && actualPackages.ui) {
        filePath = path.join(localPath, "ui");
    
        if (fs.existsSync(filePath)) {
            console.log("Removing: " + filePath);
            // Using rimraf to avoid fs-extra not-empty errors
            rimraf.sync(filePath);
            // fs.removeSync(filePath);                
        }
        delete versionJsonObject.ui;
    }
    
    // Deletes dependencies
    if (actualPackages.dependencies) {
        var dependenciesKeys = Object.keys(actualPackages.dependencies);

        dependenciesKeys.forEach(function (dependencyKey) {
            if (!(dependencyKey in vcometJsonObject.dependencies)) {
                // Dependency
                filePath = path.join(localCustomPath, dependencyKey);

                if (fs.existsSync(filePath)) {
                    console.log("Removing: " + filePath);
                    // Using rimraf to avoid fs-extra not-empty errors
                    rimraf.sync(filePath);
                }
            }
        });
    }

    // Updates version.json
    fs.writeFileSync(localVersionPath, JSON.stringify(versionJsonObject, null, 2));
}
