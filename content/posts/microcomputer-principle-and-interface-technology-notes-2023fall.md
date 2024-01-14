---
title: "《微机原理与接口技术》期末复习笔记 2023秋：Final Review Notes for Microcomputer Principle and Interface Technology Notes 2023 Fall"
date: 2024-01-04T19:00:00+08:00
# weight: 1
# aliases: ["/first"]
tags: ["XUPT","Communication","Note"]
author: "Zhao Yanbo"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "西安邮电大学《微机原理与接口技术》期末复习笔记，2023年秋季"
canonicalURL: "https://canonical.url/to/page"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
editPost:
    URL: "github.com/rbtzh/rbtzh.github.io/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: false # to append file path to Edit link
isCJKLanguage: true
lang: {zh-cn,en}
---

- 学校：西安邮电大学
- 学期：2023年秋季
- 教师：杨雪芹
- 教材：《现代通信网》，郭娟 杨武军 编著，9787560641027

## 内部结构

### 8086内部有哪些寄存器？其主要作用是什么？

16位数据寄存器：AX（可分为两个8位的AH，AL，同下）BX、CX、DX
16位指针和变址寄存器：SP、BP、SI、DI
AX BX CX DX SI DI SP BP 都是16位通用寄存器

16位段寄存器：CS、DS、SS、ES
16位指令指针寄存器：IP
16位状态标志寄存器：FLAGS

### 8086 CPU中有哪些寄存器可用来指示操作数在存储器中某段内的偏移地址？

段地址：ES、DS、SS
偏移地址：BP、SI、DI

### 8086 CPU中标志寄存器 FLAGS 有哪些标志位？它们的含义和作用如何？

状态标志位：CF、PF、AF、ZF、SF、OF
控制标志位：TF、IF、DF

### 8086 CPU的地址总线有多少位？其寻址范围是多少？

20位，1MB

### 什么叫指令队列 8086 CPU 中指令队列有什么作用？其长度分别是多少？

指令队列的引入使EU和BIU可并行工作，提高了CPU的利用率。8086的指令队列有6字节。

### Intel 8086 与 8088 有何区别？

### 简述 8086 CPU 使用地址锁存信号 ALE 将地址 A15~A0 与数据 D15~D0 分开的工作原理

### 什么是逻辑地址？什么是物理地址？若已知逻辑地址为 BA00:A800 试求物理地址

逻辑地址：表达形式为 “段地址：段内偏移地址”
物理地址：CPU与存储器进行数据交换时在地址总线上提供的20位地址信息
物理地址 = 段地址 * 10H + 偏移地址

### 简述堆栈指针寄存器 SP 的功能及堆栈的操作过程

进行进栈和出栈的过程，段地址由SS给出，段内偏移地址由SP给出。
SP始终指向栈顶，空栈时指向栈底。
进栈 SP-2，出栈 SP+2

### 段寄存器和提供偏移地址的寄存器的默认关系

CS -> IP
DS -> BX, DI, SI
SS -> SP, BP
ES -> DI

## 指令系统

### 若 (DS) = 3000H, (BX) = 2000H, (SI) = 0100H, (ES) = 4000H, 计算下列各指令中存储器操作数的物理地址

1. MOV [BX],  AH :
2. ADD AL,  [BX+SI+1000H]
3. MOV AL, [BX+SI]
4. SUB AL, ES:[BX]

> 在16位处理器中，物理地址通常由段寄存器和偏移寄存器共同计算得出。通常的计算公式为：物理地址 = 段地址 *16 + 偏移地址。
在你的问题中，DS, BX, SI, ES, 这些都是寄存器。其中，DS和ES是段寄存器，BX和SI是偏移寄存器。
根据给定的寄存器内容和计算公式，我们可以计算如下：
**MOV [BX], AH**
物理地址 = DS* 16 + BX = 3000H *16 + 2000H = 32000H + 8192 = 40200H
**ADD AL, [BX+SI+1000H]**
物理地址 = DS* 16 + BX + SI + 1000H = 3000H *16 + 2000H + 0100H + 1000H = 32000H + 8192 + 256 + 4096 = 41544H
**MOV AL, [BX+SI]**
物理地址 = DS* 16 + BX + SI = 3000H *16 + 2000H + 0100H = 32000H + 8192 + 256 = 40448H
**SUB AL, ES:[BX]**
物理地址 = ES* 16 + BX = 4000H * 16 + 2000H = 262144 + 8192 = 270336H
请注意，这些计算结果是十六进制的地址。

### 指出下列程序段的功能

```asm
MOV CX,10
CLD
LEA SI, FIRST
LEA DI, SECOND
REP MOVSB
```

复制字符串

```asm
CLD
LEA DI, [0404H]
MOV CX, 0080H
XOR AX,AX
REP STOSW
```

>这是一段8086汇编语言的代码。现在我将逐行解释：
**CLD：** 这条指令清除了方向标志（DF），使得字符串指令（如STOS、MOVS等）自动增加寄存器SI和DI的值。
**LEA DI, [0404H]：** 这条指令将立即数0404H加载到目标寄存器DI中。LEA是Load Effective Address的缩写，该指令用于获取有效地址。
**MOV CX, 0080H：** 这条指令将立即数0080H移动到寄存器CX中。MOV是Move的缩写，该指令用于数据的传送。
**XOR AX,AX：** 这条指令用于将寄存器AX中的数据与自身进行异或操作。由于任何数与自身异或的结果都是0，所以这条指令实际上是将AX寄存器清零。
**REP STOSW：** 这是一个字符串操作指令。STOSW是将AX中的数据存入由ES:DI指向的内存单元，并根据DF标志的状态自动增加或减少DI的值。而REP是重复前缀，它会根据CX的值重复执行STOSW指令，每执行一次就自动减1，直至CX为0。
**所以，这段代码的功能是：将内存地址0404H开始的0080H（或者说128）个字单元清零。**

### 设 (BX) = 6F30H, (BP) = 0200H, (SI) = 0046H, (SS) = 2F00H, (2F246H) = 4154H, 试求执行 XCHG BX, [BP + SI] 后 (BX) = ?, (2F246H) = ?

[BP+SI] -> (2F00H*10H + 0200H + 0046H) = (2f246H)

### 设 (BX) = 0400H, (DI) = 003CH, 试求执行 LEA BX, [BX+DI+0F62H] 后 (BX) = ?

0400H+003CH+0F62H

### 设(DS) = C000H, (C0010H) = 0180H, (C0012H) = 2000H, 执行 LDS SI, [10H] 后， (SI) = ?, (DS) = ?

>LDS SI, [10H] 这条指令是将内存中的数据加载到段寄存器DS和偏移寄存器SI中。DS将被加载为[10H + 2]的值，SI将被加载为[10H]的值。
在这个例子中，(DS) = C000H，(C0010H) = 0180H，(C0012H) = 2000H。所以内存地址C0010H的值将被加载到SI中，内存地址C0012H的值将被加载到DS中。
**因此，执行 LDS SI, [10H] 后， (SI) = 0180H， (DS) = 2000H**

## 汇编代码

### 上机过程

1. 用编辑程序（EDIT）建立 ASM 源程序文件；
2. 用汇编程序（MASM）把 ASM 文件汇编成 OBJ 文件；
3. 用连接程序（LINK）把 OBJ 文件转换成 EXE 文件；
4. 在 DOS 命令行直接键入文件名执行该文件。

### 程序编写

求最大值：p201
求平均：p195

## 存储器

### 存储器位扩展

![存储器位扩展示意图](/images/microcomputer-principle-and-interface-technology-notes-2023fall/存储器位扩展.png "存储器位扩展")

### 存储器字扩展

![存储器字扩展示意图](/images/microcomputer-principle-and-interface-technology-notes-2023fall/存储器字扩展.png "存储器字扩展")

### 存储器字、位同时扩展

![存储器字位同时扩展示意图](/images/microcomputer-principle-and-interface-technology-notes-2023fall/存储器字位同时扩展.png "存储器字位同时扩展")

## 中断

### CPU与外设之间数据传送的方式

1. 程序传送方式
2. 中断传送方式
3. DMA传送方式

### 中断向量表

中断服务入口地址 = 中断类型号 * 4

## 8255A

### 工作方式

1. 方式0 基本输入输出方式
2. 方式1 选通输入输出方式、
3. 方式2 选通双向输入输出方式

### 写初始化程序，A口 工作方式1输出，B口 工作方式1输入，PC4和PC5输入，允许A口中断，禁止B口中断。设片选信号 ~CS 由 A9 ~ A2=10000000确定

```asm
MOV DX, 1000000011B  ; 8255A控制字寄存器地址 -> DX
MOV AL, 10101110B   ; 工作方式选择控制字 -> AL
OUT DX, AL        ; 控制字送8255A的控制寄存器
MOV AL, 00001101B   ; PC6置1，允许A口中断
OUT DX, AL
MOV AL, 00000100B   ; PC2置0，允许B口中断
OUT DX, AL
```

![8255A控制字](/images/microcomputer-principle-and-interface-technology-notes-2023fall/8255A控制字.png "8255A控制字")
