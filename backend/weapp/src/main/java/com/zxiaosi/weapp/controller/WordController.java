package com.zxiaosi.weapp.controller;

import com.zxiaosi.common.entity.Word;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.weapp.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 单词相关接口
 *
 * @author zxiaosi
 * @date 2024/8/22 下午11:53
 */
@RestController
@RequestMapping("/wxapi/word")
public class WordController {

    @Autowired
    private WordService wordService;

    @GetMapping("/list")
    public Result<?> list(@RequestParam Integer type) {
        return Result.success(wordService.getWordListByTypeService(type));
    }

    @GetMapping("/detail")
    public Result<?> detail(@RequestParam Integer id, @RequestParam Integer type) {
        return Result.success(wordService.getWordByIdAndTypeService(id, type));
    }

    @PostMapping("/update")
    public Result<?> update(@RequestBody Word word) {
        wordService.updateWordService(word);
        return Result.success(wordService.getWordByIdAndTypeService(word.getId(), word.getType()));
    }

    @GetMapping("/favoritesList")
    public Result<?> favoritesList(@RequestParam Integer type) {
        return Result.success(wordService.getFavoritesWordListByTypeService(type));
    }

}
