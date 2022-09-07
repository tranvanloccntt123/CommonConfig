/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { ApiRequest } from '../ApiRequest';
import { getListFriend, getListPost, getVisitProfile, sendPost, deletePost } from '../Until';
import { PaginateInterface, ProfileInterface, VisitProfile } from '../AppInterface';
import axios from 'axios';
import { getCacheUser } from '../LocalCache';
jest.spyOn(axios, 'post');
jest.spyOn(axios, 'get');
jest.setTimeout(30000);
beforeEach(() => {
  ApiRequest.token = "H3FizGTaUakQUQjlFAtki41lOjHOURTyXATmxsXV";
  ApiRequest.applicationId = "10";
});

describe('TEST API', () => {
  test('visit profile', async () => {
    let r:VisitProfile | null = await getVisitProfile(5);
    expect(r?.friends).not.toBeUndefined();
    expect(r?.friends).not.toBeNull();
    expect(r?.friends).not.toBeNaN();
    expect(r?.posts).not.toBeUndefined();
    expect(r?.posts).not.toBeNull();
    expect(r?.posts).not.toBeNaN();
    expect(r).toHaveProperty('profile.id', 5);
    let r1 = await getVisitProfile(-1);
    expect(r1).toBeNull();
    let cacheUser = getCacheUser(5);
    expect(r).toEqual(cacheUser);
    let cacheUserNotFound = getCacheUser(-1);
    expect(cacheUserNotFound).toBeUndefined();
  });

  test('list friend', async () => {
    let r:PaginateInterface | null = await getListFriend();
    expect(r).not.toBeNull();
    expect(r?.data[0]).toHaveProperty('id', 5);
  });
  
  test('create post', async () => {
    let r: string | null = await sendPost(`Lorem ipsum dolor sit amet, omittam patrioque cu qui, eu mea similique definitionem. 
      Et nam posse ceteros. Legere lucilius voluptatibus ut nec, est augue soleat regione te. 
      Ex affert doming duo, postea ponderum gubergren mei at, altera labores at ius. Quo et tacimates mediocrem suavitate.`);
      expect(r).not.toBeNull();
      if(r)
      {
        expect((/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(r)).toBe(true);
        let r1: boolean = await deletePost(r);
        expect(r1).toBe(true);
      }
  });

  test('list post', async () => {
     let r: PaginateInterface | null = await getListPost();
     expect(r).not.toBeNull();
  });
});