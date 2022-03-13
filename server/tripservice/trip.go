package trip

import (
	"context"
	trippb "coolcar/proto/gen/go"
)

//type TripServiceServer interface {
//	GetTrip(context.Context, *GetTripRequest) (*GetTripResponse, error)
// }

type Service struct{}

func (*Service) GetTrip(con context.Context, req *trippb.GetTripRequest) (*trippb.GetTripResponse, error) {
	return &trippb.GetTripResponse{
		Id: req.Id,
		Trip: &trippb.Trip{
			Statar:      "北京",
			End:         "上海",
			DurationSec: 3600,
			FeeCent:     1000,
			StatarPos: &trippb.Location{
				Latitude:  30,
				Longitude: 120,
			},
			EndPos: &trippb.Location{
				Latitude:  40,
				Longitude: 125,
			},
			PathLocations: []*trippb.Location{
				{
					Latitude:  34,
					Longitude: 123,
				},
				{
					Latitude:  38,
					Longitude: 124,
				},
			},
			Status: trippb.TripStatus_FINISHED,
		},
	}, nil
}
