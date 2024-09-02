package com.zxiaosi.common.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * 单词实体类
 *
 * @author zxiaosi
 * @date 2024/8/22 下午11:22
 */
@Data
public class Word implements Serializable {

    /**
     * 用户id
     */
    private Integer id;

    /**
     * 单词
     */
    private String word;

    /**
     * 翻译1
     */
    private String translation1;

    /**
     * 翻译2
     */
    private String translation2;

    /**
     * 收藏
     */
    private Integer favorites;
}
