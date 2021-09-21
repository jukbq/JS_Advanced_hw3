let calcString = "";

function control(testString) {
    testString = testString.replace(/\++/g, "+");
    testString = testString.replace(/\--/g, "+");
    testString = testString.replace(/\.\./g, ".");
    testString = testString.replace(/[+-][-+]/g, "-");
    return testString;
}

function calculation(buffString) {
    buffString = buffString.replace(/([^[0-9.]{1})/g, " $1 ").trim();
    buffString = buffString.replace(/ {1,}/g, " ");
    let buffArray = buffString.split(/\s/);
    let polishString = new Array;
    let polishStack = new Array;
    let stringId = -1;
    let stackId = -1;
    for (let i = 0; i < buffArray.length; i++) {
        switch (buffArray[i]) {
            case "(":
                stackId++;
                polishStack[stackId] = buffArray[i];
                break;
            case ")":
                while (stackId >= 0 && polishStack[stackId] != "(") {
                    stringId++;
                    polishString[stringId] = polishStack[stackId];
                    stackId--;
                }
                stackId--;
                break;
            case "+":
                while (stackId >= 0 && (polishStack[stackId] == "+" || polishStack[stackId] == "-" || polishStack[stackId] == "*" || polishStack[stackId] == "/")) {
                    stringId++;
                    polishString[stringId] = polishStack[stackId];
                    stackId--;
                }
                stackId++;
                polishStack[stackId] = buffArray[i];
                break;
            case "-":
                while (stackId >= 0 && (polishStack[stackId] == "+" || polishStack[stackId] == "-" || polishStack[stackId] == "*" || polishStack[stackId] == "/")) {
                    stringId++;
                    polishString[stringId] = polishStack[stackId];
                    stackId--;
                }
                stackId++;
                polishStack[stackId] = buffArray[i];
                break;
            case "*":
                while (stackId >= 0 && (polishStack[stackId] == "*" || polishStack[stackId] == "/")) {
                    stringId++;
                    polishString[stringId] = polishStack[stackId];
                    stackId--;
                }
                stackId++;
                polishStack[stackId] = buffArray[i];
                break;
            case "/":
                while (stackId >= 0 && (polishStack[stackId] == "*" || polishStack[stackId] == "/")) {
                    stringId++;
                    polishString[stringId] = polishStack[stackId];
                    stackId--;
                }
                stackId++;
                polishStack[stackId] = buffArray[i];
                break;
            default:
                stringId++;
                polishString[stringId] = buffArray[i];
        }
    }
    while (stackId >= 0) {
        stringId++;
        polishString[stringId] = polishStack[stackId];
        stackId--;
    }
    stackId = -1;
    let stringIdMax = stringId;

    for (stringId = 0; stringId <= stringIdMax; stringId++) {
        switch (polishString[stringId]) {
            case "+":
                stackId--;
                polishStack[stackId] = polishStack[stackId] + polishStack[stackId + 1];
                break;
            case "-":
                stackId--;
                polishStack[stackId] = polishStack[stackId] - polishStack[stackId + 1];
                break;
            case "*":
                stackId--;
                polishStack[stackId] = polishStack[stackId] * polishStack[stackId + 1];
                break;
            case "/":
                stackId--;
                polishStack[stackId] = polishStack[stackId] / polishStack[stackId + 1];
                break;
            default:
                stackId++;
                polishStack[stackId] = parseFloat(polishString[stringId]);
        }
    }
    return polishStack[stackId];
}

function kalk() {
    let res = "";
    try {
        res = calculation(calcString);
    } catch (e) { res = "Error"; }
    document.getElementById("res").value = res;
    calcString = ""
}

function addToInput(value) {
    calcString += value;
    calcString = control(calcString);
    document.getElementById("res").value = calcString;
}

function clean() {
    calcString = "";
    document.getElementById("res").value = 0;
}

function del() {
    calcString = calcString.substr(0, calcString.length - 1);
    document.getElementById("res").value = calcString;
}