const assert = require('assert');
const pg = require('pg');
const Pool = pg.Pool;
const Reg = require('../factory');

const connectionString = process.env.DATABASE_URL || 'postgresql://thatodonvulo:pw123@localhost:5432/reg_test';

const pool = new Pool({
    connectionString
});

const registration = Reg(pool)

describe('registration function', () => {

    describe('registration number', () => {
        it('should display Botshabelo registration number', async () => {});
        it('should display Bloemfontein registration number', async () => {});
        it('should display Thaba nChu registration number', async () => {});
    })
    
})

    describe('error messages', () => {
        it('should return error message if you pass empty string',async  ()=> {
            assert.equal('Please enter number plate.', await registration.checkIfRegistrationExist(""))
        })
        it('should return error message if you pass string with empty spaces', async ()=> {
            assert.equal('Please enter the correct number plate.', await registration.checkIfRegistrationExist(" cs"))
        })
        it('should return error message if you pass undefined', async ()=> {
            assert.equal('Please enter the correct number plate.', await registration.checkIfRegistrationExist())
        })
        it('should return error message if you pass number', async ()=> {
            assert.equal('Please enter the correct number plate.', await registration.checkIfRegistrationExist(1234))
            assert.equal('Please enter the correct number plate.', await greet.checkIfRegistrationExist('1234', 'Botshabelo'))
        })
        it('should return error message if you pass null', async ()=> {
            assert.equal('Please enter number plate.', await registration.checkIfRegistrationExist(null))
        })
    })


describe("create function", function () {

    beforeEach(async () => {
        await registration.deletesNumberPlates();
    })

    it("Should be able to add the number plate to the database", async function () {
        assert.equal('CB 112 342', await registration.insertingNumberPlates("Botshabelo") )
        assert.equal('CS 112 342', await registration.insertingNumberPlates("Bloemfontein") )
        assert.equal('CT 112 342', await registration.insertingNumberPlates("Thaba nChu") )
    })


//  






})