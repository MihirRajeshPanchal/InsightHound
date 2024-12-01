/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { ImageEditorProps, TextPosition } from '@/lib/types/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RainbowButton } from '@/components/ui/rainbow-button';

const ImageEditor = ({ columns, tableData, image, imageRef, setImage, setTextPositions, textPositions }: ImageEditorProps) => {
    const [customFontNames, setCustomFontNames] = useState<string[]>([]);
    const [activeText, setActiveText] = useState<number>(0);
    const styleSheetRef = useRef<HTMLStyleElement | null>(null);
    const inpRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            const fontName = e.target.files[0].name.split('.')[0];

            reader.onload = (event: any) => {
                const fontBase64 = event.target.result;

                if (!styleSheetRef.current) {
                    const styleSheet = document.createElement('style');
                    document.head.appendChild(styleSheet);
                    styleSheetRef.current = styleSheet;
                }

                const styleSheet = styleSheetRef.current!;
                styleSheet.innerHTML += `
          @font-face {
            font-family: '${fontName}';
            src: url(${fontBase64}) format('truetype');
          }
        `;
                setCustomFontNames((prev) => [...prev, fontName]);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const addText = (column: string) => {
        setTextPositions([
            ...textPositions,
            {
                id: textPositions.length,
                column,
                x: 100,
                y: 100,
                color: 'black',
                backgroundColor: 'transparent',
                fontSize: 16,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontFamily: 'Arial',
            },
        ]);
    };

    const updateTextPosition = (id: number, updates: Partial<TextPosition>) => {
        setTextPositions((prev) =>
            prev.map((text) => (text.id === id ? { ...text, ...updates } : text))
        );
    };

    const handleExport = async () => {
        const generatedImages = [];

        for (const row of tableData) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = imageRef.current?.clientWidth || 500;
            canvas.height = imageRef.current?.clientHeight || 500;

            if (image) {
                const baseImage = new Image();
                baseImage.src = image;
                await new Promise((resolve) => {
                    baseImage.onload = () => {
                        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
                        resolve(true);
                    };
                });
            }

            const updatedTextPositions = textPositions.map((text) => ({
                ...text,
                column: row[text.column],
            }));

            updatedTextPositions.forEach((text) => {
                ctx.font = `${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
                ctx.textAlign = "left";

                const textMetrics = ctx.measureText(text.column);
                const textWidth = textMetrics.width;
                const textHeight = text.fontSize;

                ctx.fillStyle = text.backgroundColor;
                ctx.fillRect(text.x - 10, text.y - textHeight, textWidth + 10, textHeight + 10);

                ctx.fillStyle = text.color;
                ctx.fillText(text.column, text.x, text.y);
            });
            const dataUrl = canvas.toDataURL("image/png");

            generatedImages.push({
                email: row.email,
                dataUrl,
            });
        }

        generatedImages.forEach((imageInfo) => {
            const link = document.createElement('a');
            link.href = imageInfo.dataUrl;
            link.download = `image-${imageInfo.email}.png`;
            link.click();
        });
    };


    const handleFontRemoval = (index: number) => {
        setCustomFontNames((prev) => prev.filter((_, i) => i !== index));
    }

    return image ? (
        <div>
            <h2 className='text-xl font-semibold pb-4'>Image Upload and Text Placement</h2>
            <Input className='w-fit' type="file" accept="image/*" onChange={handleImageUpload} />
            <div className='flex w-full justify-between items-center'>
                <div className='pt-4'>
                    <h3 className='text-lg font-medium pb-2'>Place columns on the image</h3>
                    <div className='flex gap-2 flex-wrap'>

                        {columns.map((column, index) => (
                            <Button key={index} onClick={() => addText(column)}>
                                <Plus size={15} />
                                <span className='pl-2'> {column}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className='text-lg font-medium pb-2'>Upload Custom Font</h3>
                    <Input className='w-fit' type="file" accept=".ttf,.otf,.woff" onChange={handleFontUpload} />
                    <div className='flex flex-wrap gap-4 pt-4'>
                        {customFontNames.map((font, index) => (<button key={index} onClick={() => handleFontRemoval(index)} className='p-2 bg-foreground text-background rounded-lg w-fit text-xs flex items-center'>{font} <Trash size={14} /></button>))}
                    </div>
                </div>
            </div>
            <div className='flex gap-6'>
                <div
                    ref={imageRef}
                    className='relative h-full w-1/2 mt-5'
                >
                    <img src={image} alt="uploaded" className='w-full h-auto' />

                    {textPositions.map((text) => (
                        <Draggable
                            key={text.id}
                            position={{ x: text.x, y: text.y }}
                            onStop={(e, data) =>
                                updateTextPosition(text.id, { x: data.x, y: data.y })
                            }
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    color: text.color,
                                    fontSize: `${text.fontSize}px`,
                                    fontWeight: text.fontWeight,
                                    fontStyle: text.fontStyle,
                                    backgroundColor: text.backgroundColor,
                                    fontFamily: text.fontFamily,
                                    padding: '2px 4px',
                                    cursor: 'move',
                                }}
                            >
                                {text.column}
                            </div>
                        </Draggable>
                    ))}
                </div>
                <ScrollArea className='w-1/2 max-h-full' style={{ height: imageRef.current?.clientHeight }}>
                    {textPositions.length > 0 && (
                        <div className='pt-4'>
                            <h3 className='text-lg font-medium pb-2'>Customize Text</h3>
                            {textPositions.map((text, ind) => (
                                <div key={text.id} className='border rounded p-2 flex flex-col gap-2'>
                                    <div className='flex justify-between w-full items-center'>
                                        <h4 onClick={() => setActiveText(ind)} className='font-medium cursor-pointer'>{ind + 1}. {text.column}</h4>
                                        <Button variant="destructive" className='!p-1 !h-5' onClick={() => setTextPositions((prev) => prev.filter((t, i) => i != ind))}>
                                            <Trash2 size={10} />
                                        </Button>
                                    </div>
                                    {activeText === ind && <div className='grid grid-cols-6 gap-2'>
                                        <Label className='flex items-center gap-2'>
                                            Color:
                                            <Input
                                                className='w-16'
                                                type="color"
                                                value={text.color}
                                                onChange={(e) => updateTextPosition(text.id, { color: e.target.value })}
                                            />
                                        </Label>

                                        <Label className='flex items-center gap-2 col-span-2'>
                                            Font Size:
                                            <Input
                                                className='min-w-16 w-fit'
                                                type="number"
                                                value={text.fontSize}
                                                onChange={(e) => updateTextPosition(text.id, { fontSize: parseInt(e.target.value) })}
                                            />
                                        </Label>
                                        <div className='flex items-center justify-between col-span-3 '>
                                            <Label className='flex items-center gap-2 '>
                                                Background Color:
                                                <Input
                                                    className='w-16'
                                                    type="color"
                                                    value={text.backgroundColor}
                                                    onChange={(e) => updateTextPosition(text.id, { backgroundColor: e.target.value })}
                                                />
                                            </Label>
                                            {textPositions[text?.id]?.backgroundColor !== "transparent" && <Button className='text-xs p-2' onClick={() => updateTextPosition(text.id, { backgroundColor: 'transparent' })}>Clear BG</Button>}
                                        </div>
                                        <Label className='flex items-center gap-2 col-span-2'>
                                            Font Weight:
                                            <Select
                                                value={text.fontWeight}
                                                onValueChange={(v) => updateTextPosition(text.id, { fontWeight: v })}
                                            >
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue placeholder="Font Weight" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="bold">Bold</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </Label>
                                        <Label className='flex items-center gap-2 col-span-2'>
                                            Font Style:
                                            <Select
                                                value={text.fontStyle}
                                                onValueChange={(v) => updateTextPosition(text.id, { fontStyle: v })}
                                            >
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue placeholder="Font Style" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="italic">Italic</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </Label>
                                        <Label className='flex items-center gap-2 col-span-2'>
                                            Font Family:
                                            <Select
                                                value={text.fontFamily}
                                                onValueChange={(v) => updateTextPosition(text.id, { fontFamily: v })}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Font Family" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Arial">Arial</SelectItem>
                                                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                                    <SelectItem value="Courier New">Courier New</SelectItem>
                                                    {customFontNames.map((item, idx) =>
                                                        <SelectItem key={idx} value={item}>{item}</SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </Label>
                                    </div>}
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </div>
            <div className='flex justify-end'>
                <Button variant="outline" onClick={handleExport} className='mt-4'>
                    Export Images
                </Button>
            </div>
        </div>
    ) : (
        <div className='flex justify-end'>
            <Input ref={inpRef} className='w-fit hidden' type="file" accept="image/*" onChange={handleImageUpload} />
            <RainbowButton className='w-fit' onClick={() => inpRef.current?.click()}>Add Image</RainbowButton>
        </div>
    )
};

export default ImageEditor;
