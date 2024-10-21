function userForm() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;

    let membership;
    if (document.getElementById('premium').checked) {
        membership = "Premium";
    } else if (document.getElementById('standard').checked) {
        membership = "Standard";
    } else {

        membership = "Basic";

    }


    
    const output = `
        <p><strong>Full Name:</strong> ${fname} ${lname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${province}</p>
        <p><strong>Membership:</strong> ${membership}</p>
    `;
    
    document.getElementById('output').innerHTML = output;
}





function myExcelFuns() {
    const numberStr = document.getElementById('numbers').value.trim();
    if (!numberStr) {
        alert('Please enter numbers.');
        return;
    }

    const numberArr = numberStr.split(/\s+/).map(Number).filter(n => !isNaN(n));
    let result = 0;

    if (document.getElementById('sum').checked) {
        result = numberArr.reduce((acc, num) => acc + num, 0);
    } else if (document.getElementById('avg').checked) {
        result = numberArr.reduce((acc, num) => acc + num, 0) / numberArr.length;
    } else if (document.getElementById('max').checked) {
        result = Math.max(...numberArr);
    } else {
        result = Math.min(...numberArr);
    }

    document.getElementById('result').innerHTML = `Result: ${result}`;



}


function setTheme(theme) {

    
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }
}
