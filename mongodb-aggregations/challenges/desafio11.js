db.trips.aggregate([
  {
    $match: { startTime: { $exists: true, $not: { $eq: "" } } },
  },
  {
    $addFields: {
      dayOfVoo: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$dayOfVoo",
      totalVoos: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$totalVoos",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
