db.trips.aggregate([
  {
    $match: { usertype: { $exists: true, $not: { $eq: "" } } },
  },
  {
    $addFields: {
      timeVoo: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      avgTimeVoo: { $avg: "$timeVoo" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$avgTimeVoo", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
