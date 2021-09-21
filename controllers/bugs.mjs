import { Sequelize } from 'sequelize';

export default function initBugsController(db) {
  const index = async (req, res) => {
    try {
      const features = await db.Feature.findAll({
      });
      const bugs = await db.Bug.findAll({
        order: Sequelize.literal('bug.created_at DESC'),
        include: db.Feature,
      });
      res.render('index', { features, bugs });
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (req, res) => {
    try {
      const data = await db.Bug.create({
        problem: req.body.problem,
        error_text: req.body.errorText,
        commit: req.body.commit,
        feature_id: req.body.featureID,
      });
      console.log(data);
      res.send(data);
    }
    catch (error) {
      res.send(error);
    }
  };
  return {
    index,
    submit,
  };
}
