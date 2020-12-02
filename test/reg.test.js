const assert = require('assert');
const pg = require('pg');
const Pool = pg.Pool;
const Reg = require('../factory');

const connectionString = process.env.DATABASE_URL || 'postgresql://thatodonvulo:pg123@localhost:5432/registrations';

const pool = new Pool({
    connectionString
});

let registration = Reg(pool)



describe("create function", function () {

    beforeEach(async () => {
        await pool.query('delete from number_plate')
    })

    describe('registration function', () => {

        it("should display number plate to database", async function () {
            await registration.insertingNumberPlates("CB 123 123")
            assert.deepEqual([{ numberplate: "CB 123 123" }], await registration.getsNumberPlate())

        })
        it("should filter the number plate by Botshabelo", async function () {
            await registration.insertingNumberPlates("CB 123 123");
            await registration.insertingNumberPlates("Cs 123 123");
            await registration.insertingNumberPlates("Ct 123 123");
            await registration.insertingNumberPlates("CB 124 123");

            assert.deepEqual([
                {
                    "numberplate": "CB 123 123",
                },
                {
                    "numberplate": "CB 124 123",

                }], await registration.filter(1))

        })

        it("should filter the number plate by Thaba Nchu", async function () {
            await registration.insertingNumberPlates("CT 123 123");
            await registration.insertingNumberPlates("Cs 133 123");
            await registration.insertingNumberPlates("Cb 193 123");
            await registration.insertingNumberPlates("CT 124 123");
            assert.deepEqual([
                {
                    "numberplate": "CT 123 123",
                },
                {
                    "numberplate": "CT 124 123",
                }], await registration.filter(2))

        })

        it("should filter the number plate by Thaba Nchu", async function () {
            await registration.insertingNumberPlates("CS 123 123");
            await registration.insertingNumberPlates("Ct 133 123");
            await registration.insertingNumberPlates("Cb 193 123");
            await registration.insertingNumberPlates("CS 124 123");
            assert.deepEqual([
                {
                    "numberplate": "CS 123 123",
                },
                {
                    "numberplate": "CS 124 123",
                }], await registration.filter(3))
        })
        it('should be able to clear number plate from the database', async function () {
            // the Factory Function is called greetFactory
          
    
            await registration.deletesNumberPlates("CB 158");
            await registration.deletesNumberPlates("CT 555 798");
            await registration.deletesNumberPlates("CS 555-694");
            var number = await registration.getsNumberPlate()
            assert.equal(0, number);
        });

    })




})