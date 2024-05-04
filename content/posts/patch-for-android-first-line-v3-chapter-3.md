---
title: "给《第一行代码 Android 第三版》第三章打补丁"
date: 2024-02-03T08:26:53+08:00
# weight: 1
# aliases: ["/first"]
tags: ["Android","Kotlin","Coding"]
author: "Zhao Yanbo"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "读这本书踩到的坑"
canonicalURL: "https://blog.zhaoyanbo.com/posts/patch-for-android-first-line-v3-chapter-3/"
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
    image: "/images/patch-for-android-first-line-v3-chapter-3/first-line-android-chapter3-cover.png"  # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: false # only hide on current single page
editPost:
    URL: "github.com/rbtzh/rbtzh.github.io/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: false # to append file path to Edit link
---

作者在编写这本书第三版的时候还是 Android 10，但当我读到这本书手机上跑的已经是 Android 14 了，期间发生了很多技术上的变化。我把遇到的坑列出来，希望能给你提供一些参考。

## 第三章

### 3.2

#### kotlin-android-extensions 已被弃用，现在用 Jetpack view binding （3.2.4）

Android Developers 上这篇 [Migrate from Kotlin synthetics to Jetpack view binding](https://developer.android.com/topic/libraries/view-binding/migration#kts) 指出 kotlin-android-extensions 已被弃用，应该用 Jetpack view binding。但我写到这里才发现我一直用的是 [databinding](https://developer.android.com/topic/libraries/data-binding) 而不是 [viewbinding](https://developer.android.com/topic/libraries/view-binding)。好在这俩差不多。

##### 以下是将 findViewById() 换用为 View Binding 的方法

1. 在 build.gradle.kts (Module :app) 中添加以下字段启用 View Binding

    ```kotlin
    ... 
    android{
    ...
        buildFeatures{
    ...
            viewBinding = true
        }
    }
    ```

    然后 Sync Project with Gradle Files 使其生效。我这里的快捷键是 Ctrl+Shift+O。

2. 在 onCreate() 中添加如下代码 (假设 Activity 名为 MainActivity)

    ```kotlin
    val binding = ActivityMainBinding.inflate(layoutInflater)
            setContentView(binding.root)
    ```

    之后就可以用如下的代码为一个（id 为 button1）的 Button 绑定点击事件：

    ```kotlin
    binding.button1.setOnClickListener {
                Log.d("MainActivity","button1 clicked")
            }
    ```

##### 以下是将 findViewById() 换用为 Data Binding 的方法

1. 在 build.gradle.kts (Module :app) 中添加以下字段启用Data Binding

    ```kotlin
    ... 
    android{
    ...
        buildFeatures{
    ...
            dataBinding = true
        }
    }
    ```

    然后 Sync Project with Gradle Files 使其生效。我这里的快捷键是 Ctrl+Shift+O。

2. 将对应布局文件的类转换为 Data Binding Layout。方法为

    1. 右键类名（书中提到的LinearLayout。默认生成的是androidx.constraintlayout.widget.ConstraintLayout）

    2. Show Context Actions

    3. Convert to data binding layout

3. 在 onCreate() 中添加如下代码 (假设 Activity 名为 MainActivity)

    ```kotlin
    val binding = ActivityMainBinding.inflate(layoutInflater)
            setContentView(binding.root)
    ```

    之后就可以用如下的代码为一个（id 为 button1）的 Button 绑定点击事件：

    ```kotlin
    binding.button1.setOnClickListener {
                Log.d("MainActivity","button1 clicked")
            }
    ```

### 3.3

1. 在 AndroidManifest 中注册 Activity，若想要用隐式 Intent 调用，需要设置 android:exported="true" （3.3.2）
2. （？）隐式Intent，匹配URI的方法无法实现（3.3.3）
3. startActivityForResult 已被弃用，但仍然可以工作（3.3.5）
4. onBackPressed 已被弃用，但仍然可以工作（3.3.5）
