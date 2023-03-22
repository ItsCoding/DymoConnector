import * as Dymo from "dymojs";
import { StickerRequest } from "../types/StickerRequest";
const dymo = new Dymo.default();


export const generateLabelXml = (request: StickerRequest) => {
    return `<?xml version="1.0" encoding="utf-8"?>
                        <DieCutLabel Version="8.0" Units="twips" MediaType="Default">
                            <PaperOrientation>Landscape</PaperOrientation>
                            <Id>ReturnAddressInt</Id>
                            <PaperName>11352 Return Address Int</PaperName>
                            <DrawCommands>
                                <RoundRectangle X="0" Y="0" Width="1440" Height="3060" Rx="180" Ry="180"/>
                            </DrawCommands>
                            <ObjectInfo>
                                <TextObject>
                                <Name>Header/Name</Name>
                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                                <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
                                <LinkedObjectName></LinkedObjectName>
                                <Rotation>Rotation0</Rotation>
                                <IsMirrored>False</IsMirrored>
                                <IsVariable>False</IsVariable>
                                <HorizontalAlignment>Left</HorizontalAlignment>
                                <VerticalAlignment>Middle</VerticalAlignment>
                                <TextFitMode>AlwaysFit</TextFitMode>
                                <UseFullFontHeight>True</UseFullFontHeight>
                                <Verticalized>False</Verticalized>
                                <StyledText>
                                    <Element>
                                    <String>${request.name}</String>
                                    <Attributes>
                                        <Font Family="Helvetica" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                                        <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                                    </Attributes>
                                    </Element>
                                </StyledText>
                                </TextObject>
                                <Bounds X="1484.932" Y="57.59995" Width="1491.068" Height="560"/>
                            </ObjectInfo>
                            <ObjectInfo>
                                <BarcodeObject>
                                <Name>BARCODE</Name>
                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                                <BackColor Alpha="255" Red="255" Green="255" Blue="255"/>
                                <LinkedObjectName></LinkedObjectName>
                                <Rotation>Rotation0</Rotation>
                                <IsMirrored>False</IsMirrored>
                                <IsVariable>False</IsVariable>
                                <Text>${request.id}</Text>
                                <Type>QRCode</Type>
                                <Size>Large</Size>
                                <TextPosition>None</TextPosition>
                                <TextFont Family="Helvetica" Size="36" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                                <CheckSumFont Family="Helvetica" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                                <TextEmbedding>None</TextEmbedding>
                                <ECLevel>0</ECLevel>
                                <HorizontalAlignment>Center</HorizontalAlignment>
                                <QuietZonesPadding Left="0" Right="0" Top="0" Bottom="0"/>
                                </BarcodeObject>
                                <Bounds X="129.5999" Y="63.3812" Width="1391.712" Height="1275.741"/>
                            </ObjectInfo>
                            <ObjectInfo>
                                <TextObject>
                                <Name>Subline</Name>
                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                                <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
                                <LinkedObjectName></LinkedObjectName>
                                <Rotation>Rotation0</Rotation>
                                <IsMirrored>False</IsMirrored>
                                <IsVariable>False</IsVariable>
                                <HorizontalAlignment>Left</HorizontalAlignment>
                                <VerticalAlignment>Middle</VerticalAlignment>
                                <TextFitMode>ShrinkToFit</TextFitMode>
                                <UseFullFontHeight>True</UseFullFontHeight>
                                <Verticalized>False</Verticalized>
                                <StyledText>
                                    <Element>
                                    <String>${request.subline}</String>
                                    <Attributes>
                                        <Font Family="Helvetica" Size="7" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                                        <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                                    </Attributes>
                                    </Element>
                                </StyledText>
                                </TextObject>
                                <Bounds X="1501.957" Y="630.314" Width="1474.043" Height="283.5"/>
                            </ObjectInfo>
                            <ObjectInfo>
                                <TextObject>
                                <Name>Position</Name>
                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                                <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
                                <LinkedObjectName></LinkedObjectName>
                                <Rotation>Rotation0</Rotation>
                                <IsMirrored>False</IsMirrored>
                                <IsVariable>False</IsVariable>
                                <HorizontalAlignment>Left</HorizontalAlignment>
                                <VerticalAlignment>Middle</VerticalAlignment>
                                <TextFitMode>ShrinkToFit</TextFitMode>
                                <UseFullFontHeight>True</UseFullFontHeight>
                                <Verticalized>False</Verticalized>
                                <StyledText>
                                    <Element>
                                    <String>${request.position}</String>
                                    <Attributes>
                                        <Font Family="Helvetica" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                                        <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                                    </Attributes>
                                    </Element>
                                </StyledText>
                                </TextObject>
                                <Bounds X="1520.049" Y="1036.072" Width="1455.951" Height="283.5"/>
                            </ObjectInfo>
                        </DieCutLabel>
`;
}



export const generateImageFromMessage = (labelXml:string) => {
    return new Promise((resolve, reject) => {
        dymo.renderLabel(labelXml).then((imageData: string) => {
            resolve(imageData)
        }, (error: any) => {
            reject(error)
        });
    })
}