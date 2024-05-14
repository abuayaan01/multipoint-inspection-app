function nestedLinksfun(
  ground,
  roof,
  exterior,
  garage,
  basement,
  bathroom,
  crawlSpace,
  diningRoom,
  electricCoolingSystem,
  heatingSystem,
  interior,
  kitchen,
  laundryRoom,
  livingRoom,
  plumbing,
  bedroom,
) {
  const groundNestedLinks = ground?.map((items, index) => {
    let groundId = items._id;
    return {
      name: "Ground (" + (index + 1) + ")",
      mainRoute: "grounds",
      propertyId: items._id,
      childRoute: [
        {
          name: "Service Walks",
          link: `ground/${groundId}/${index + 1}/service-walks`,
        },
        {
          name: "Driveway/Parking",
          link: `ground/${groundId}/${index + 1}/driveway-parking`,
        },
        {
          name: "Porch",
          link: `ground/${groundId}/${index + 1}/porch`,
        },
        {
          name: "Stoops/Steps",
          link: `ground/${groundId}/${index + 1}/stoops-steps`,
        },
        {
          name: "Patio",
          link: `ground/${groundId}/${index + 1}/patio`,
        },
        {
          name: "Deck/Balcony",
          link: `ground/${groundId}/${index + 1}/deck-balcony`,
        },
        {
          name: "Deck/Patio/Porch Covers",
          link: `ground/${groundId}/${index + 1}/deck-patio-porch-covers`,
        },
        {
          name: "Fence/Wall",
          link: `ground/${groundId}/${index + 1}/fence-wall`,
        },
        {
          name: "Landscaping foundation",
          link: `ground/${groundId}/${index + 1}/landscaping-foundation`,
        },
        {
          name: "Retaining Wall",
          link: `ground/${groundId}/${index + 1}/retaining-wall`,
        },
        {
          name: "Hose Bibs",
          link: `ground/${groundId}/${index + 1}/hose-bibs`,
        },
      ],
    };
  });
  const roofNestedLinks = roof?.map((items, index) => {
    let roofId = items._id;
    return {
      name: "Roof (" + (index + 1) + ")",
      mainRoute: "roof",
      propertyId: items._id,
      childRoute: [
        {
          name: "General",
          link: `roof/${roofId}/${index + 1}/general`,
        },
        {
          name: "Style of Roof",
          link: `roof/${roofId}/${index + 1}/style-of-roof`,
        },
        {
          name: "Ventilation System",
          link: `roof/${roofId}/${index + 1}/ventilation-system`,
        },
        {
          name: "Flashing",
          link: `roof/${roofId}/${index + 1}/flashing`,
        },
        {
          name: "Valleys",
          link: `roof/${roofId}/${index + 1}/valleys`,
        },
        {
          name: "Condition of Roof Covering",
          link: `roof/${roofId}/${index + 1}/condition-of-roof-covering`,
        },
        {
          name: "Skylights",
          link: `roof/${roofId}/${index + 1}/skylights`,
        },
        {
          name: "Plumbing Vents",
          link: `roof/${roofId}/${index + 1}/plumbing-vents`,
        },
      ],
    };
  });
  const garageNestedLinks = garage?.map((items, index) => {
    let garageId = items._id;
    return {
      name: "Garage (" + (index + 1) + ")",
      mainRoute: "garage",
      propertyId: items._id,
      childRoute: [
        {
          name: "Type",
          link: `garage/${garageId}/${index + 1}/Type`,
        },
        {
          name: "Automatic Opener",
          link: `garage/${garageId}/${index + 1}/Automatic Opener`,
        },
        {
          name: "Safety Reverse",
          link: `garage/${garageId}/${index + 1}/Safety Reverse`,
        },
        {
          name: "Roofing",
          link: `garage/${garageId}/${index + 1}/Roofing`,
        },
        {
          name: "Gutters/Eavestrough",
          link: `garage/${garageId}/${index + 1}/Gutters/Eavestrough`,
        },
        {
          name: "Siding",
          link: `garage/${garageId}/${index + 1}/Siding`,
        },
        {
          name: "Trim",
          link: `garage/${garageId}/${index + 1}/Trim`,
        },
        {
          name: "Floor",
          link: `garage/${garageId}/${index + 1}/Floor`,
        },
        {
          name: "Sill Plates",
          link: `garage/${garageId}/${index + 1}/Sill Plates`,
        },
        {
          name: "Overhead Door(s)",
          link: `garage/${garageId}/${index + 1}/Overhead Door(s)`,
        },
        {
          name: "Exterior Service Door",
          link: `garage/${garageId}/${index + 1}/Exterior Service Door`,
        },
        {
          name: "Electrical Receptacles",
          link: `garage/${garageId}/${index + 1}/Electrical Receptacles`,
        },
        {
          name: "Fire Separation Wall And Ceilling",
          link: `garage/${garageId}/${index + 1
            }/Fire Separation Wall And Ceilling`,
        },
      ],
    };
  });
  const exteriorNestedLinks = exterior?.map((items, index) => {
    let exteriorId = items._id;
    return {
      name: "Exterior (" + (index + 1) + ")",
      mainRoute: "exterior",
      propertyId: items._id,
      childRoute: [
        {
          name: "Chimney(s)",
          link: `exterior/${exteriorId}/${index + 1}/Chimney(s)`,
        },
        {
          name: "Gutters/Scuppers/Eavestrough",
          link: `exterior/${exteriorId}/${index + 1
            }/Gutters/Scuppers/Eavestrough`,
        },
        {
          name: "Siding",
          link: `exterior/${exteriorId}/${index + 1}/Siding`,
        },
        {
          name: "Trim",
          link: `exterior/${exteriorId}/${index + 1}/Trim`,
        },
        {
          name: "Soffit",
          link: `exterior/${exteriorId}/${index + 1}/Soffit`,
        },
        {
          name: "Fascia",
          link: `exterior/${exteriorId}/${index + 1}/Fascia`,
        },
        {
          name: "Flashing",
          link: `exterior/${exteriorId}/${index + 1}/Flashing`,
        },
        {
          name: "Caulking",
          link: `exterior/${exteriorId}/${index + 1}/Caulking`,
        },
        {
          name: "Windows/Screens",
          link: `exterior/${exteriorId}/${index + 1}/Windows/Screens`,
        },
        {
          name: "Slab on Grade/Foundation",
          link: `exterior/${exteriorId}/${index + 1}/Slab on Grade/Foundation`,
        },
        {
          name: "Service Entry",
          link: `exterior/${exteriorId}/${index + 1}/Service Entry`,
        },
        {
          name: "Building(s) Exterior wall construction",
          link: `exterior/${exteriorId}/${index + 1
            }/Building(s) Exterior wall construction`,
        },
        {
          name: "Exterior doors",
          link: `exterior/${exteriorId}/${index + 1}/Exterior doors`,
        },
        {
          name: "Exterior AC Heat Pumps",
          link: `exterior/${exteriorId}/${index + 1}/Exterior AC Heat Pumps`,
        },
        {
          name: "Stroms/Windows",
          link: `exterior/${exteriorId}/${index + 1}/Stroms/Windows`,
        },
      ],
    };
  });
  const basementLinks = basement?.map((items, index) => {
    let basementId = items._id;
    return {
      name: "Basement (" + (index + 1) + ")",
      mainRoute: "basement",
      propertyId: items._id,
      childRoute: [
        {
          name: "Columns",
          link: `basement/${basementId}/${index + 1}/Columns`,
        },
        {
          name: "Drainage",
          link: `basement/${basementId}/${index + 1}/Drainage`,
        },
        {
          name: "Floor",
          link: `basement/${basementId}/${index + 1}/Floor`,
        },
        {
          name: "Foundation",
          link: `basement/${basementId}/${index + 1}/Foundation`,
        },
        {
          name: "Girders/Beams",
          link: `basement/${basementId}/${index + 1}/GirdersBeams`,
        },
        {
          name: "Joists",
          link: `basement/${basementId}/${index + 1}/Joists`,
        },
        {
          name: "Seismic Bolts",
          link: `basement/${basementId}/${index + 1}/SeismicBolts`,
        },
        {
          name: "Stairs",
          link: `basement/${basementId}/${index + 1}/Stairs`,
        },
        {
          name: "Subfloor",
          link: `basement/${basementId}/${index + 1}/Subfloor`,
        },
      ],
    };
  });
  const bathroomLinks = bathroom?.map((items, index) => {
    let bathroomId = items._id;
    return {
      name: "Bathroom (" + (index + 1) + ")",
      mainRoute: "bathroom",
      propertyId: items._id,
      childRoute: [
        {
          name: "Bath",
          link: `bathroom/${bathroomId}/${index + 1}/Bath`,
        },
      ],
    };
  });
  const bedroomLinks = bedroom?.map((items, index) => {
    let bedroomId = items._id;
    return {
      name: "Bedroom (" + (index + 1) + ")",
      mainRoute: "bedroom",
      propertyId: items._id,
      childRoute: [
        {
          name: "Bedroom",
          link: `bedroom/${bedroomId}/${index + 1}/bedroom`,
        },
      ],
    };
  });
  const crawlSpaceLinks = crawlSpace?.map((items, index) => {
    let crawlSpaceId = items._id;
    return {
      name: "Crawl Space (" + (index + 1) + ")",
      mainRoute: "crawlSpace",
      propertyId: items._id,
      childRoute: [
        {
          name: "Access",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/Access`,
        },
        {
          name: "CrawlSpace",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/CrawlSpace`,
        },
        {
          name: "Drainage",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/Drainage`,
        },
        {
          name: "Floor",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/Floor`,
        },
        {
          name: "Foundation Walls",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/FoundationWalls`,
        },
        {
          name: "Girders/Beams/Columns",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/GirdersBeamsColumns`,
        },
        {
          name: "Insulation",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/Insulation`,
        },
        {
          name: "Joists",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/Joists`,
        },
        {
          name: "Seismic Bolts",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/SeismicBolts`,
        },
        {
          name: "Subfloor",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/Subfloor`,
        },
        {
          name: "Vapor Barrier",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/VaporBarrier`,
        },
        {
          name: "Ventilation",
          link: `crawlSpace/${crawlSpaceId}/${index + 1}/Ventilation`,
        },
      ],
    };
  });
  const diningRoomLinks = diningRoom?.map((items, index) => {
    let diningRoomId = items._id;
    return {
      name: "Dining Room (" + (index + 1) + ")",
      mainRoute: "diningRoom",
      propertyId: items._id,
      childRoute: [
        {
          name: "Dining Room",
          link: `diningRoom/${diningRoomId}/${index + 1}/DiningRoom`,
        },
      ],
    };
  });
  const electricCoolingSystemLinks = electricCoolingSystem?.map(
    (items, index) => {
      let electricCoolingSystemId = items._id;
      return {
        name: "Electric Cooling System (" + (index + 1) + ")",
        mainRoute: "electricCoolingSystem",
        propertyId: items._id,
        childRoute: [
          {
            name: "Main Panel",
            link: `electricCoolingSystem/${electricCoolingSystemId}/${index + 1
              }/MainPanel`,
          },
          {
            name: "Sub panel(s)",
            link: `electricCoolingSystem/${electricCoolingSystemId}/${index + 1
              }/Subpanels`,
          },
          {
            name: "Evaporator Coil Section Unit #1",
            link: `electricCoolingSystem/${electricCoolingSystemId}/${index + 1
              }/EvaporatorCoilSectionUnit1`,
          },
          {
            name: "Evaporator Coil Section Unit #2",
            link: `electricCoolingSystem/${electricCoolingSystemId}/${index + 1
              }/EvaporatorCoilSectionUnit2`,
          },
        ],
      };
    }
  );
  const heatingSystemLinks = heatingSystem?.map((items, index) => {
    let heatingSystemId = items._id;
    return {
      name: "Heating System (" + (index + 1) + ")",
      mainRoute: "heatingSystem",
      propertyId: items._id,
      childRoute: [
        {
          name: "Heating System",
          link: `heatingSystem/${heatingSystemId}/${index + 1}/HeatingSystem`,
        },
        {
          name: "Boiler System",
          link: `heatingSystem/${heatingSystemId}/${index + 1}/BoilerSystem`,
        },
        {
          name: "Other System",
          link: `heatingSystem/${heatingSystemId}/${index + 1}/OtherSystem`,
        },
      ],
    };
  });
  const interiorLinks = interior?.map((items, index) => {
    let interiorId = items._id;
    return {
      name: "Interior (" + (index + 1) + ")",
      mainRoute: "interior",
      propertyId: items._id,
      childRoute: [
        {
          name: "Attic/Structure/Faming/Insulation",
          link: `interior/${interiorId}/${index + 1
            }/AtticStructureFamingInsulation`,
        },
        {
          name: "Fireplace",
          link: `interior/${interiorId}/${index + 1}/Fireplace`,
        },
        {
          name: "Smoke/Carbon Monoxide Detectors",
          link: `interior/${interiorId}/${index + 1
            }/SmokeCarbonMonoxideDetectors`,
        },
        {
          name: "Stairs/Steps/Balconies",
          link: `interior/${interiorId}/${index + 1}/StairsStepsBalconies`,
        },
      ],
    };
  });
  const kitchenLinks = kitchen?.map((items, index) => {
    let kitchenId = items._id;
    return {
      name: "Kitchen (" + (index + 1) + ")",
      mainRoute: "kitchen",
      propertyId: items._id,
      childRoute: [
        {
          name: "Appliance",
          link: `kitchen/${kitchenId}/${index + 1}/Appliance`,
        },
        {
          name: "Cabinets",
          link: `kitchen/${kitchenId}/${index + 1}/Cabinets`,
        },
        {
          name: "Countertops",
          link: `kitchen/${kitchenId}/${index + 1}/Countertops`,
        },
        {
          name: "Floor",
          link: `kitchen/${kitchenId}/${index + 1}/Floor`,
        },
        {
          name: "Heating/Cooling Source",
          link: `kitchen/${kitchenId}/${index + 1}/HeatingCoolingSource`,
        },
        {
          name: "Plumbing",
          link: `kitchen/${kitchenId}/${index + 1}/Plumbing`,
        },
        {
          name: "Walls And Ceilling",
          link: `kitchen/${kitchenId}/${index + 1}/WallsAndCeilling`,
        },
      ],
    };
  });
  const laundryRoomLinks = laundryRoom?.map((items, index) => {
    let laundryRoomId = items._id;
    return {
      name: "Laundry Room (" + (index + 1) + ")",
      mainRoute: "laundryRoom",
      propertyId: items._id,
      childRoute: [
        {
          name: "Laundry",
          link: `laundryRoom/${laundryRoomId}/${index + 1}/Laundry`,
        },
      ],
    };
  });
  const livingRoomLinks = livingRoom?.map((items, index) => {
    let livingRoomId = items._id;
    return {
      name: "Living Room (" + (index + 1) + ")",
      mainRoute: "livingRoom",
      propertyId: items._id,
      childRoute: [
        {
          name: "Living Room",
          link: `livingRoom/${livingRoomId}/${index + 1}/LivingRoom`,
        },
      ],
    };
  });
  const plumbingLinks = plumbing?.map((items, index) => {
    let plumbingId = items._id;
    return {
      name: "Plumbing (" + (index + 1) + ")",
      mainRoute: "plumbing",
      propertyId: items._id,
      childRoute: [
        {
          name: "Water Service",
          link: `plumbing/${plumbingId}/${index + 1}/WaterService`,
        },
        {
          name: "Main Fuel Shut Off Location",
          link: `plumbing/${plumbingId}/${index + 1}/MainFuelShutOffLocation`,
        },
        {
          name: "Well Pump",
          link: `plumbing/${plumbingId}/${index + 1}/WellPump`,
        },
        {
          name: "Sanitary Grinder Pump",
          link: `plumbing/${plumbingId}/${index + 1}/SanitaryGrinderPump`,
        },
        {
          name: "Water Heater #1",
          link: `plumbing/${plumbingId}/${index + 1}/WaterHeater1`,
        },
        {
          name: "Water Heater #2",
          link: `plumbing/${plumbingId}/${index + 1}/WaterHeater2`,
        },
        {
          name: "Water Softener",
          link: `plumbing/${plumbingId}/${index + 1}/WaterSoftener`,
        },
      ],
    };
  });

  const nestedLinks = [
    ...groundNestedLinks,
    ...roofNestedLinks,
    ...exteriorNestedLinks,
    ...garageNestedLinks,
    ...basementLinks,
    ...bathroomLinks,
    ...crawlSpaceLinks,
    ...diningRoomLinks,
    ...electricCoolingSystemLinks,
    ...heatingSystemLinks,
    ...interiorLinks,
    ...kitchenLinks,
    ...laundryRoomLinks,
    ...livingRoomLinks,
    ...plumbingLinks,
    ...bedroomLinks,
  ];
  return nestedLinks;
}

export default nestedLinksfun;
