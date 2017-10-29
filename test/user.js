let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

let User = require('../models/V1/User');

describe('Users', () => {
	describe('/GET api/user/active', () => {
		it('it should GET all active users', (done) => {
		chai.request(server)
				.get('/api/user/active')
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
});