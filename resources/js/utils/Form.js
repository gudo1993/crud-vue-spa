import Errors from './Errors';

class Form {

	constructor(data){
		this.originalData = data;
		for(let field in data){
			this[field] = data[field];
		}

		this.errors = new Errors();
	}

	reset(){
		for(let field in this.originalData){
			// Exclude the 'success' property as this only indicates
			// whether the form was submitted successfully or not.
			if (this[field] !== this.success){
				this[field] = '';
			}
		}

		this.errors.clear();
	}

	/**
	 * Send a POST request to the given URL.
	 * .
	 * @param {string} url
	 */
	post(url){
		return this.submit('post', url);
	}

	/**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
	put(url) {
		return this.submit('put', url);
	}

	/**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
	patch(url) {
		return this.submit('patch', url);
	}

	delete(url){
		return this.submit('delete', url);
	}

	/**
	 * Perform promised-based ajax request.
	 *
	 * @param  {string} requestType
	 * @param {string} url
	 * 
	 */
	submit(requestType, url){

		return new Promise((resolve, reject) => {
			axios[requestType](url, this.data())
				.then(response => {
					
					if(requestType != 'patch'){
						this.onSuccess(response.data);
					} else {
						this.onSuccessPatch(response.data);
					}
					
					resolve(response.data);

				})
				.catch(error => {
					this.onFail(error.response.data.errors);
					reject(error.response.data);
				});
				
		});

	}

	/**
	 * Handle a successful form submission.
	 *
	 * @param {object} data
	 */
	onSuccess(data){
		this.success = true;
		this.message = data.message;
		this.reset();
	}
	
	/**
	 * Handle a successful patch submission.
	 * It will not reset the form after
	 * the patch request succeeds.
	 *
	 * @param {object} data
	 */
	onSuccessPatch(data){
		this.success = true;
		this.message = data.message;
	}

	onFail(errors){
		this.errors.record(errors);
	}

	/**
	 * Prepare the data to be saved in db storage.
	 * Get only the relevant data for the form.
	 *
	 */
	data(){
		// let data = Object.assign({}, this);
		// delete data.originalData;
		// delete data.errors;
		let data = {};
		for(let property in this.originalData){
			data[property] = this[property];
		}

		return data;
	}
}

export default Form;