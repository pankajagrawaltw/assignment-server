var express = require('express');
var router = express.Router();
var jobs = require("../DATA/jobs.json")


/**
 * api for get the list of jobs between two dates
 * @param from_date 
 * @param to_date
 *
 */
router.get('/', (req, res, next) => {
  try {

    var { from_date, to_date } = req.query;
    let data = []
    let invited_data = []

    // check both dates are existed or not
    if (from_date && to_date) {

      from_date = new Date(from_date);
      to_date = new Date(to_date);

      // filtered the jobs according to the from date and to date
      data = jobs.filter(job => {
        let date = new Date(job.date)
        return (date >= from_date && date <= to_date && !job.invited)
      });

    }
    else {
      data = jobs
    }
    // extracted the imvited jobs
    invited_data = jobs.filter(job => job.invited)

    res.status(200).json({ jobs: data, invitedJobs: invited_data, message: 'Jobs are available' })

  } catch (error) {
    res.status(500).send(error)
    console.log(error);
  }
});


/**
 * api for apply the job by job id
 * @param id 
 * 
 */

router.get("/apply/:id", (req, res, next) => {
  try {
    var { id } = req.params

    /**
     * check the id is even or odd 
     * id id is even then send success else send erro
     */
    if (id % 2 === 0) {
      res.status(200).json({ success: true })
    }
    else {
      res.status(200).json({ error: 'Unable to apply!' })
    }

  } catch (error) {
    res.status(500).send(error)
    console.log(error);
  }
})


/**
 * api for decline the job by job id
 * @param id
 *
 */
router.get("/decline/:id", (req, res, next) => {
  try {
    var { id } = req.params

    /**
    * check the id is even or odd
    * id id is even then send success else send erro
    */
    if (id % 2 === 0) {
      res.status(200).json({ success: true })
    }
    else {
      res.status(200).json({ error: 'Unable to decline!' })
    }

  } catch (error) {
    res.status(500).send(error)
    console.log(error);
  }
})
module.exports = router;
