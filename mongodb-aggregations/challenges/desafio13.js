db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-10T24:00:00Z"),
      },
    },
  },
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
      _id: null,
      avgTimeVoo: { $avg: "$timeVoo" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$avgTimeVoo" },
    },
  },
]);
