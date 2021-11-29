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
    $match: {
      dayOfVoo: { $eq: 5 },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      totalVoos: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
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
