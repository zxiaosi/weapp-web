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
    public Result<?> list() {
        return Result.success(wordService.getWordListService());
    }

    @PostMapping("/add")
    public Result<?> add(@RequestBody Word word) {
        wordService.addWordService(word);
        return Result.success();
    }

    @PostMapping("/update")
    public Result<?> update(@RequestBody Word word) {
        wordService.updateWordService(word);
        return Result.success();
    }

    @PostMapping("/favorites")
    public Result<?> favorites(@RequestBody Word word) {
        wordService.favoritesWordService(word.getId());
        return Result.success(wordService.getWordService(word.getId()));
    }

    @PostMapping("/cancelFavorites")
    public Result<?> cancelFavorites(@RequestBody Word word) {
        wordService.cancelFavoritesWordService(word.getId());
        return Result.success(wordService.getWordService(word.getId()));
    }

    @GetMapping("/favoritesList")
    public Result<?> favoritesList() {
        return Result.success(wordService.getFavoritesWordListService());
    }

}
