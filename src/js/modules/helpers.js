function validateInput(input, regExp, plus = '') {
    if(!regExp.test(input.value[input.value.length - 1])) 
    {
        input.value = input.value.slice(0, input.value.length - 1)
    }
    if (plus === '+' && !input.value.startsWith('+') && input.value !== '') 
    {
        input.value = '+' + input.value
    }
};

export { validateInput }