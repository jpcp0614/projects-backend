db.trips.aggregate([
  {
    $addFields: {
      timeVoo: {
        $multiply: [
          { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
          60,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      avgTimeVoo: { $avg: "$timeVoo" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$avgTimeVoo" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
