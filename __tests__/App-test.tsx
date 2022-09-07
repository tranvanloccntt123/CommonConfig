/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { ApiRequest } from '../ApiRequest';
import { getListFriend, getListPost, getVisitProfile, sendPost, deletePost, getListChat } from '../Until';
import { PaginateInterface, ProfileInterface, VisitProfile } from '../AppInterface';
import axios from 'axios';
import { getCacheUser } from '../LocalCache';
jest.spyOn(axios, 'post');
jest.spyOn(axios, 'get');
jest.setTimeout(30000);

beforeAll(() => {
  ApiRequest.token = "H3FizGTaUakQUQjlFAtki41lOjHOURTyXATmxsXV";
  ApiRequest.applicationId = "10";
});

describe('TEST API', () => {
  test('profile', async () => {
    //check profile
    let r: VisitProfile | null = await getVisitProfile(5);
    expect(r?.friends).not.toBeUndefined();
    expect(r?.friends).not.toBeNull();
    expect(r?.friends).not.toBeNaN();
    expect(r?.posts).not.toBeUndefined();
    expect(r?.posts).not.toBeNull();
    expect(r?.posts).not.toBeNaN();
    expect(r).toHaveProperty('profile.id', 5);
    //check profile not found
    let r1 = await getVisitProfile(-1);
    expect(r1).toBeNull();
    let cacheUser = getCacheUser(5);
    expect(r).toEqual(cacheUser);
    let cacheUserNotFound = getCacheUser(-1);
    expect(cacheUserNotFound).toBeUndefined();
  });
  test('message', async () => {
    //get list message
    let r: PaginateInterface | null = await getListChat()
    expect(r).not.toBeNull()
  });
  test('friend', async () => {
    //get list friend
    let r: PaginateInterface | null = await getListFriend();
    expect(r).not.toBeNull();
    expect(r?.data[0]).toHaveProperty('id', 5);
  });

  test('post', async () => {
    //check create post
    let r: string | null = await sendPost(`Lorem ipsum dolor sit amet, omittam patrioque cu qui, eu mea similique definitionem. 
      Et nam posse ceteros. Legere lucilius voluptatibus ut nec, est augue soleat regione te. 
      Ex affert doming duo, postea ponderum gubergren mei at, altera labores at ius. Quo et tacimates mediocrem suavitate.`);
    expect(r).not.toBeNull();
    if (!r) return
    expect((/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(r)).toBe(true);
    //check get list post
    let rList: PaginateInterface | null = await getListPost();
    expect(rList).not.toBeNull();
    //check delete post
    let r1: boolean = await deletePost(r);
    expect(r1).toBe(true);
    //check post is create success
    let count = 0;
    rList?.data.forEach(value => {
      if(value['UUID'] == r) count++;
    })
    expect(count).not.toBe(0);
  });
});