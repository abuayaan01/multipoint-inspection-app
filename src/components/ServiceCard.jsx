import React from "react";
import { Card, CardBody, Text, Center } from "@chakra-ui/react";

function ServiceCard(props) {
  return (
    <>
      <Card className="flex flex-1">
        <CardBody
          style={{
            background: props.cardColor,
          }}
          className="rounded flex gap-2 cursor-pointer"
          onClick={props.onClick}
        >
          <Card className="">
            <CardBody
              style={{
                background: props.iconBg,
                padding: "15px",
              }}
              className="rounded"
            >
              <Center>{props.icon}</Center>
              {/* {props.icon} */}
            </CardBody>
          </Card>
          <div className="flex-1">
            <Text className="text-white text-right">{props.text}</Text>
            <Text className="text-white font-bold text-xl text-right">
              {props.data}
            </Text>
          </div>
        </CardBody>
      </Card>
    </>
  );
}



export default ServiceCard;
