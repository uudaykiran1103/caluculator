const calculate = (s) => {
    console.log("Val==>" + "  " + s);
    if (s == null || s.length === 0) return null;

    // Remove spaces
    s = s.replace(/\s/g, '');

    let st = [];
    let n = 0;
    let sign = '+';

    for (let i = 0; i < s.length; i++) {
        const c = s[i];

        // Number
        if (/\d/.test(c)) n = n * 10 + Number(c);

        // Sign or last number
        if (/\D/.test(c) || i === s.length - 1) {
            if (sign === '-') st.push(-n);
            else if (sign === '+') st.push(n);
            else if (sign === 'x') st.push(st.pop() * n);
            else if (sign === '/') st.push(~~(st.pop() / n));

            sign = c;
            n = 0;
        }
    }
    let sex = st.reduce((a, b) => a + b);
    console.log("ret val" + sex);
    return st.reduce((a, b) => a + b);
};

const resultElement = document.getElementById('lr');
const buttons = document.querySelectorAll('.btnbox');
let currentInput = '';
let ress = ' ';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText === 'DEL') {
            currentInput = currentInput.slice(0, -1);
        } else if (buttonText === 'RESET') {
            currentInput = '0';
        } else if (buttonText === '=') {
            try {
                ress = calculate(currentInput).toString();
                console.log(ress);
                currentInput = ress;

            } catch (error) {
                currentInput = 'Error';
                console.log(error);
            }
        } else {
            currentInput += buttonText;
        }

        resultElement.textContent = currentInput;

        if (currentInput === '' || currentInput === '0') {
            resultElement.style.opacity = '0.5';
        } else {
            resultElement.style.opacity = '1';
        }
    });
});

// Handle initial empty state of the display
window.onload = () => {
    resultElement.textContent = '0';
    resultElement.style.opacity = '0.5';
};
