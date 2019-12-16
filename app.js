const jsonRadio = document.getElementById('json');
const paramsRadio = document.getElementById('params');
const parameterBox = document.getElementById('parameters');
const jsonBox = document.getElementById('jsonbox');
const responseBox = document.getElementById('responsebox');
// Initially hide the parameter Box as JSON is checked
parameterBox.style.display = 'none';
responseBox.style.display = 'none';

// Toggle between JSON and custom parameters
paramsRadio.addEventListener('click', () => {
    jsonBox.style.display = 'none';
    parameterBox.style.display = 'block';
})

jsonRadio.addEventListener('click', () => {
    parameterBox.style.display = 'none';
    jsonBox.style.display = 'block';
})

// Add more parameter option by clicking plus button
let paramCount = 1;

const plusBtn = document.getElementById('plusButton');
plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let html = `
				<div class="form-row my-3">
					<label for="params${paramCount+1}" class="col-sm-2 col-form-label">Parameter ${paramCount+1}</label>
					<div class="col-md-4">
						<input type="text" id="key${paramCount+1}" class="form-control" placeholder="Key ${paramCount+1}..">
					</div>
					<div class="col-md-4">
						<input type="text" id="value${paramCount+1}" class="form-control" placeholder="Value ${paramCount+1}..">
					</div>
					<button class="btn btn-danger minusButton">-</button>
				</div>
	`;
    renderString(html);
    // document.getElementById('moreParams').innerHTML += html;
    paramCount++;

    // Remove parameter when clicked on - button
    const removeBtn = document.getElementsByClassName('minusButton');
    for (item of removeBtn) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
})

function renderString(string) {
	const div = document.createElement('div');
	div.innerHTML = string;
	const divNode = div.firstElementChild;
	document.getElementById('moreParams').appendChild(divNode);
}

// Submit Button Event Listener
const submitBtn = document.getElementById('submitButton');
submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            responseBox.style.display = 'block';
            const urlVal = document.getElementById('url').value;
            const get = document.getElementById('get');
            const post = document.getElementById('post');
            const reqType = get.checked ? get.value : post.value;
            const contentType = jsonRadio.checked ? jsonRadio.value : paramsRadio.value;


            // Taking value of JSON / Custom Parameters
            if (contentType === 'JSON') {
                data = document.getElementById('jsonreq').value;
            } else {
                data = {};
                for (let i = 0; i < paramCount; i++) {
                    if (document.getElementById('key' + (i + 1)) != undefined) {
                        let key = document.getElementById('key' + (i + 1)).value;
                        let value = document.getElementById('value' + (i + 1)).value;
                        data[key] = value;
                    }
                }
                data = JSON.stringify(data);
            }

            // Fetch response for GET and POST request
            if (reqType == 'GET') {
                fetch(urlVal).then(response => response.text()).then(res => {
                        responsePrism.innerHTML = res;
                        Prism.highlightAll();
                    })
                }
                else {
                    console.log(data);
                    fetch(urlVal, {
                        method: 'POST',
                        body: data,
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    }).then(response => response.text()).then(res => {
                        responsePrism.innerHTML = res;
                        Prism.highlightAll();
                    });
                }
            });