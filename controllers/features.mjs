export default function initFeaturesController(db) {
  const submit = async (req, res) => {
    try {
      await db.Feature.create({
        name: req.body.name,
      });
      res.send('Feature Created');
    }
    catch (error) {
      res.send(error);
    }
  };
  return {
    submit,
  };
}
