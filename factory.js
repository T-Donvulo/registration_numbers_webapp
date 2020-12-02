module.exports = function factory(pool) {

    const code = {
        Botshabelo: 'CB',
        ThabaNchu: 'CT',
        Bloemfontein: 'CS'
    }

    async function allRegistrations() {
        var all = await pool.query('select * from number_plate');
        return all.rows

    }


    async function checkIfRegistrationExist(plate) {
        var check = await pool.query('SELECT numberPlate from number_plate where numberPlate = $1', [plate]);
        return check.rowCount

    }
    async function ids(id) {
        var townId = await pool.query('select id from town_codes where townName=$1', [id]);
        console.log();
        
        return townId.rows[0].id
    }

    //check if exists, then get the number plate(check the errors in it), then insert the number plate, 
    async function insertingNumberPlates(plate) {

        //give two characters of a string at the beginning of the number plate hence  (0,2 ) whic says two characters    
        var codes = plate.substring(0, 2)
        //to say that I want it to take upper cases and lower cases    
        let town_tag = codes.toUpperCase();
        // console.log(town_tag)

        var id = await ids(town_tag)
        //    console.log(townId.rows[0].id) 
        let reg;
        if (id > 0) {
            reg = await pool.query('select numberPlate from number_plate where numberPlate = $1', [plate])
        }
        // console.log(reg.rowCount)

        if (reg.rowCount === 0) {
            await pool.query('insert into number_plate(numberplate,townName_id) values($1, $2)', [plate, id]);
        }
    }


    async function filter(filt) {
        if (filt === 'All') {
            var filtering = await pool.query('select numberPlate from number_plate');
            return filtering.rows
        }
        else {
            const byTowns = await pool.query('select numberPlate from number_plate where townName_Id=$1', [filt]);
            return byTowns.rows
        }

    }

    async function getsNumberPlate() {
        var gets = await pool.query('select numberPlate from number_plate');
        return gets.rows
    }

    async function deletesNumberPlates() {
        var erase = await pool.query('delete from number_plate');
        // console.log(erase.rows)
        return erase.rows;

    }


    return {
        checkIfRegistrationExist,
        allRegistrations,
        insertingNumberPlates,
        getsNumberPlate,
        deletesNumberPlates,
        filter,
        ids

    }
}